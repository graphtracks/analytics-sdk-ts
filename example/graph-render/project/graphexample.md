# How to Display BlueSky Followers Graph

## Prerequisites

- Node.js v14+ and npm installed
- Basic familiarity with JavaScript

## 1. Acquire Your Graphtracks API Key

## 2. Initialize a New Svelte Project

Use the modern Svelte CLI to scaffold your project in one command:

```bash
npx sv create
```

## 2. Install API Client and Chart Library

Run:

```bash
npm install @graphtracks/client chart.js
```

- **@graphtracks/client**: to call BlueSky Analytics API
- **chart.js**: to render the data

## 3. Configure Your API Key

Inside `src/lib/`, create `config.ts`:

```ts
export const GRAPHTRACKS_API_KEY = "YOUR_API_KEY_HERE";
```

> **Tip:** For production, load this from an environment variable instead of hard-coding.

## 4. Build the BlueSkyGraph Component

Create `src/lib/BlueSkyGraph.svelte` with the following content:

```html
<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import {
    BlueSkyAnalyticsApi,
    Configuration,
    Network,
    Metric,
    Timeframe,
  } from "@graphtracks/client";
  import { GRAPHTRACKS_API_KEY } from "./config";

  interface DataPoint {
    time: string;
    value: number;
  }
  interface ApiResponse {
    data: DataPoint[];
  }

  const api = new BlueSkyAnalyticsApi(
    new Configuration({ apiKey: GRAPHTRACKS_API_KEY })
  );
  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;

  async function fetchAndRender() {
    const response: ApiResponse = await api.getGlobalStatsForAccountAPI({
      network: Network.BlueSky,
      accountId: "did:plc:4llrhdclvdlmmynkwsmg5tdc",
      metric: Metric.Followers,
      timeframe: Timeframe._1h,
      bucket: "60",
    });

    const labels = response.data.map((p) =>
      new Date(p.time).toLocaleTimeString()
    );
    const values = response.data.map((p) => p.value);

    const ctx = chartCanvas.getContext("2d");
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Followers",
            data: values,
            borderColor: "rgb(75,192,192)",
            tension: 0.1,
          },
        ],
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } },
    });
  }

  onMount(fetchAndRender);
</script>

<div style="width:800px; height:400px">
  <canvas bind:this="{chartCanvas}"></canvas>
</div>
```

## 5. Integrate into Your App

In `src/App.svelte`:

```html
<script lang="ts">
  import BlueSkyGraph from "./lib/BlueSkyGraph.svelte";
</script>

<main>
  <h1>BlueSky Followers Over Time</h1>
  <BlueSkyGraph />
</main>
```
