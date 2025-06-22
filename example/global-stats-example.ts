import { BlueSkyAnalyticsApi } from "../api";
import { Configuration } from "../configuration";
import { Metric, Network, Timeframe } from "../model";

const did = process.argv[2];

// Initialize API client
const api = new BlueSkyAnalyticsApi(
	new Configuration({
		apiKey: process.env.GRAPHTRACKS_API_KEY,
		basePath: process.env.GRAPHTRACKS_API_URL || "https://api.graphtracks.com",
	}),
);

// Get followers stats for a given account
api
	.getGlobalStatsForAccount({
		network: Network.BlueSky, // Only Bluesky is supported
		accountId: did, // atproto account did
		metric: Metric.Followers, // Metric to query
		from: "2025-05-01", // Start date in UTC
		timeframe: Timeframe._7d, // relative amount of time since `from` to get metric
		// to: '2025-05-07', // End date in UTC.
		bucket: (3600 * 24).toString(), // Interval between datapoints. It is recommended to keep datapoints count low both for UX and performance
	})
	.then((res) => {
		console.log(res.data);
	});
