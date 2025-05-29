import { BlueSkyAnalyticsApi } from "../api/blue-sky-analytics-api";
import { Configuration } from "../configuration";
import { Metric, Network, Timeframe } from "../model";

describe("Account Stats Integration Tests", () => {
	let api: BlueSkyAnalyticsApi;
	const validAccount = process.env.TEST_DID;

	beforeAll(() => {
		const config = new Configuration({
			apiKey: process.env.GRAPHTRACKS_API_KEY,
			basePath:
				process.env.GRAPHTRACKS_API_BASE_PATH || "https://api.graphtracks.com",
		});
		api = new BlueSkyAnalyticsApi(config);
		console.log("Test setup:", {
			apiKey: process.env.GRAPHTRACKS_API_KEY ? "SET" : "NOT_SET",
			validAccount,
			basePath: config.basePath
		});
	});

	it("should get global stats for account", async () => {
		const account = validAccount;
		const timeframe = Timeframe._1d;
		const network = Network.BlueSky;
		const metrics = [Metric.Followers];
		const from = new Date();
        const bucket = 3600;
		from.setUTCDate(from.getUTCDate() - 30);

		try {
			const response = await api.getGlobalStatsForAccountAPI({
				accountId: account,
				network: network,
				metric: metrics[0],
				from: from.toISOString(),
				timeframe: timeframe,
				bucket: bucket.toString(),
			});

			expect(response).toBeDefined();
			expect(response.data).toBeDefined();
			expect(Array.isArray(response.data)).toBe(true);
			if (response.data.length > 0) {
				expect(response.data.some((point: any) => point.value !== 0)).toBe(true);
			}
		} catch (error: any) {
			console.error("Error details:", {
				status: error.response?.status,
				statusText: error.response?.statusText,
				data: error.response?.data,
				message: error.message,
				config: error.config
			});
			throw error;
		}
	});

	it("should handle invalid account", async () => {
		const account = "invalid-did";
		const timeframe = Timeframe._1d;
		const network = Network.BlueSky;
		const metrics = [Metric.Followers];

		await expect(
			api.getGlobalStatsForAccountAPI({
				accountId: account,
				network: network,
				metric: metrics[0],
				from: new Date().toISOString(),
				timeframe,
			}),
		).rejects.toThrow();
	});

	it("should get stats with multiple metrics", async () => {
		const account = validAccount;
		const timeframe = Timeframe._7d;
		const network = Network.BlueSky;
		const metrics = [
			Metric.Followers,
			Metric.Likes,
			Metric.Replies,
			Metric.Reposts,
		];
        const bucket = 3600;

		for (const metric of metrics) {
			try {
				const response = await api.getGlobalStatsForAccountAPI({
					accountId: account,
					network: network,
					metric: metric,
					timeframe,
                    bucket: bucket.toString(),
				});

				expect(response).toBeDefined();
				expect(response.data).toBeDefined();
				expect(Array.isArray(response.data)).toBe(true);
				expect(response.data.length).toBeGreaterThan(0);
				if (response.data.length > 0) {
					expect(response.data.some((point: any) => point.value !== 0)).toBe(true);
				}
			} catch (error: any) {
				console.error(`Error for ${metric}:`, {
					status: error.response?.status,
					data: error.response?.data,
					message: error.message
				});
				throw error;
			}
		}
	});

	it("should get stats for different timeframes", async () => {
		const account = validAccount;
		const network = Network.BlueSky;
		const from = new Date();
		from.setUTCDate(from.getUTCDate() - 30);
        const bucket = 3600 * 24;
		const timeframes = [Timeframe._1d, Timeframe._7d, Timeframe._30d];

		for (const timeframe of timeframes) {
			try {
				const response = await api.getGlobalStatsForAccountAPI({
					accountId: account,
					network: network,
					metric: Metric.Followers,
					from: from.toISOString(),
					timeframe,
                    bucket: bucket.toString(),
				});
				expect(response).toBeDefined();
				expect(response.data).toBeDefined();
				expect(Array.isArray(response.data)).toBe(true);
				if (response.data.length > 0) {
					expect(response.data.some((point: any) => point.value !== 0)).toBe(true);
				}
			} catch (error: any) {
				console.error(`Error for ${timeframe}:`, {
					status: error.response?.status,
					data: error.response?.data,
					message: error.message
				});
				throw error;
			}
		}
	});
});
