import { BlueSkyAnalyticsApi } from "../api";
import { Configuration } from "../configuration";
import {
	CreateNetworkAccountRequestNetworkEnum,
	DataPoint,
	Metric,
	Network,
	NetworkAccount,
	PostsInner,
	Timeframe,
} from "../model";

const accountHandle = process.argv[2];

const apiKey = process.env.GRAPHTRACKS_API_KEY;

if (!apiKey) {
	console.error("Error: GRAPHTRACKS_API_KEY environment variable is not set.");
	process.exit(1);
}

if (!accountHandle) {
	console.error("Usage: ts-node example2.ts <accountHandle>");
	console.error("  <accountHandle>:   e.g., graphtracks.com");
	process.exit(1);
}

// Initialize API client
const api = new BlueSkyAnalyticsApi(
	new Configuration({
		basePath: process.env.GRAPHTRACKS_API_URL || "https://api.graphtracks.com",
		apiKey: apiKey,
	}),
);

// Get or create a network account from a username
api
	.getNetworkAccounts()
	.then((res: { data: Array<NetworkAccount> }) => {
		const account = res.data.find(
			(acc) => acc.account_handle === accountHandle,
		);
		if (account) {
			console.log("Found existing network account.");
			return Promise.resolve({ data: account }); // Wrap in a promise to match createNetworkAccount's response structure
		}
		console.log("Network account not found, creating a new one...");
		return api
			.createNetworkAccount({
				createNetworkAccountRequest: {
					account_handle: accountHandle,
					network: CreateNetworkAccountRequestNetworkEnum.BlueSky,
				},
			})
			.then(() => {
				console.log("Re-fetching network accounts to get the DID...");
				return api.getNetworkAccounts();
			})
			.then((accountsRes: { data: Array<NetworkAccount> }) => {
				const newAccount = accountsRes.data.find(
					(acc) => acc.account_handle === accountHandle,
				);
				if (!newAccount) {
					throw new Error(
						`Could not find newly created account for handle: ${accountHandle}`,
					);
				}
				return { data: newAccount };
			});
	})
	.then((res: { data: NetworkAccount }) => {
		console.log("Account details retrieved:", res.data);
		const accountIdForNextCalls = res.data.account_id;

		if (!accountIdForNextCalls) {
			console.error("Error: Could not retrieve a valid account_id (DID).");
			process.exit(1);
		}

		console.log(
			`Using accountId: ${accountIdForNextCalls} for subsequent calls`,
		);

		return api
			.getTopPostsForAccount({
				network: Network.BlueSky,
				accountId: accountIdForNextCalls,
				limit: 10,
			})
			.then((postsRes) => ({
				postsResponse: postsRes,
				accountId: accountIdForNextCalls,
			}));
	})
	.then(
		({
			postsResponse,
			accountId,
		}: { postsResponse: { data: Array<PostsInner> }; accountId: string }) => {
			console.log("Top posts:", postsResponse.data);
			const topPost = postsResponse.data?.[0];
			const postDate = new Date(topPost.indexedAt);

			if (topPost && topPost.post_id) {
				console.log(
					`Fetching stats for post ${topPost.post_id} by author ${accountId}`,
				);

				return api.getPostStats({
					network: Network.BlueSky,
					accountId: accountId,
					postId: topPost.post_id,
					metric: Metric.Likes,
					from: postDate.toISOString(),
					timeframe: Timeframe._7d,
					bucket: 3600 * 24,
				});
			}
		},
	)
	.then((res?: { data: Array<DataPoint> }) => {
		if (res) {
			console.log("Stats for top post:", res.data);
		}
	})
	.catch((error: any) => {
		console.error(
			"Error fetching account details or subsequent data:",
			error.response?.data || error.message,
		);
	});
