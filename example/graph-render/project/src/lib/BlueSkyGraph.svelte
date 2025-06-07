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

    // if you want to resolve a username to a DID, you can call the function like this:
    async function usernameToDid(username: string): Promise<string> {
        const res = await fetch(
            `https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${username}`,
        );
        const { data } = await res.json();
        return data.did;
    }

    async function fetchData() {
        data = await api.getGlobalStatsForAccountAPI({
            network: Network.BlueSky,
            accountId: usernameToDid("atrupar.com"),
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

<div style="width: 800px; height: 400px;">
    <canvas bind:this={chartCanvas}></canvas>
</div>
