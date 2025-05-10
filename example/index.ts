import { GraphTracksAnalyticsApi } from "../src/api/graph-tracks-analytics-api";
import { Configuration } from "../src/configuration";
import { Metric, Network, Timeframe } from "../src/model";

const did = process.argv[2];

// Initialize API client
const api = new GraphTracksAnalyticsApi(new Configuration({
    apiKey: process.env.GRAPHTRACKS_API_KEY,
}));

// Get followers stats for a given account
api.getGlobalStatsForAccountAPI({
    network: Network.BlueSky, // Only Bluesky is supported 
    accountId: did, // atproto account did
    metric: Metric.Followers, // Metric to query
    from: '2025-05-01', // Start date in UTC
    timeframe: Timeframe._7d, // relative amount of time since `from` to get metric
    // to: '2025-05-07', // End date in UTC. Cannot be passed together with timeframe
    bucket: (3600 * 24).toString(), // Interval between datapoints. It is recommended to keep datapoints count low both for UX and performance
}).then((res) => {
    console.log(res.data);
});