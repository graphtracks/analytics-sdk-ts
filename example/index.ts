import { GraphTracksAnalyticsApi } from "../src/api/graph-tracks-analytics-api";
import { Configuration } from "../src/configuration";
import { Metric, Network, Timeframe } from "../src/model";

const did = process.argv[2];
const api = new GraphTracksAnalyticsApi(new Configuration({
    apiKey: process.env.GRAPHTRACKS_API_KEY,
}));

api.getGlobalStatsForAccountAPI({
    network: Network.BlueSky,
    accountId: did,
    metric: Metric.Followers,
    from: '2025-05-01',
    timeframe: Timeframe._7d,
    bucket: (3600 * 24).toString(),
}).then((res) => {
    console.log(res.data);
});