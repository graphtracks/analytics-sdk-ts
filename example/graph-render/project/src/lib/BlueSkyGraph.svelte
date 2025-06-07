<script lang="ts">
    import { BlueSkyAnalyticsApi, type DataPoint } from "@graphtracks/client";
    import { Configuration } from "@graphtracks/client";
    import { Metric, Network, Timeframe } from "@graphtracks/client";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { GRAPHTRACKS_API_KEY } from "$lib";

    const api = new BlueSkyAnalyticsApi(
        new Configuration({
            apiKey: GRAPHTRACKS_API_KEY,
        }),
    );

    let data;
    let chartCanvas: HTMLCanvasElement;
    let chart: Chart | undefined;
    let username = "";

    async function usernameToDid(username: string): Promise<string> {
        const res = await fetch(
            `https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${username}`,
        );
        const data = await res.json();
        return data.did;
    }

    async function fetchData() {
        if (!username) return;
        const accountId = await usernameToDid(username);

        data = await api.getGlobalStatsForAccountAPI({
            network: Network.BlueSky,
            accountId,
            metric: Metric.Followers,
            timeframe: Timeframe._1h,
            bucket: "60",
        });

        if (data && chartCanvas) {
            const ctx = chartCanvas.getContext("2d");
            if (!ctx) return;

            if (chart) {
                chart.destroy();
            }
            chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: data.data.map((item: DataPoint) =>
                        new Date(item.time).toLocaleTimeString(),
                    ),
                    datasets: [
                        {
                            label: "Followers",
                            data: data.data.map(
                                (item: DataPoint) => item.value,
                            ),
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }

    onMount(() => {
        fetchData();
    });
</script>

<div style="width: 800px; height: 50px;">
    <input bind:value={username} placeholder="Username" />
    <button on:click={fetchData}>Fetch</button>
</div>
<div style="width: 800px; height: 400px;">
    <canvas bind:this={chartCanvas}></canvas>
</div>
