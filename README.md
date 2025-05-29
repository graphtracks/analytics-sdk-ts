## @graphtracks/client@1.0.0


**TypeScript SDK for Bluesky Social Media Analytics** - analytics client library that enables developers to access detailed Bluesky social network statistics, user engagement metrics, and growth analytics through the GraphTracks API.

This is work in progress. Please contact support@graphtracks.com to get the api key and join our [Discord](https://discord.gg/6ghZTfhW9s)

## Features

* Get stats for a given account by DID 
* Stats are available for the following metrics:
    * Followers
    * Replies
    * Reposts
    * Likes
* More detailed metrics coming soon

## Requirements

* Node.js 22+

This TypeScript/JavaScript client  utilizes [axios](https://github.com/axios/axios). 

Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify
* Vite

Language level
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition will be automatically resolved via `package.json`. ([Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html))

### Installing

```
npm install @graphtracks/client --save
```

### Usage

Create a file `get-stats.ts` with the following content:

```typescript
import { BlueSkyAnalyticsApi } from "@graphtracks/client";
import { Configuration } from "@graphtracks/client";
import { Metric, Network, Timeframe } from "@graphtracks/client";

const did = process.argv[2];

// Initialize API client
const api = new BlueSkyAnalyticsApi(new Configuration({
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
```

Run the script:

```
npx ts-node get-stats.ts did_of_the_account_you_want_to_get_stats_for
```

Example output:

```json
[
  { time: '2025-05-01 00:00:00', value: 30898 },
  { time: '2025-05-02 00:00:00', value: 27199 },
  { time: '2025-05-03 00:00:00', value: 26890 },
  { time: '2025-05-04 00:00:00', value: 27511 },
  { time: '2025-05-05 00:00:00', value: 28753 },
  { time: '2025-05-06 00:00:00', value: 28346 },
  { time: '2025-05-07 00:00:00', value: 27372 }
]
```


### Documentation for API Endpoints

All URIs are relative to *https://api.graphtracks.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*BlueSkyAnalyticsApi* | [**getGlobalStatsForAccountAPI**](docs/BlueSkyAnalyticsApi.md#getglobalstatsforaccountapi) | **GET** /v1/api/networks/{network}/accounts/{account_id}/stats/{metric} | Growth rate statistics for account


### Documentation For Models

 - [DataPoint](docs/DataPoint.md)
 - [GetGlobalStatsForAccountAPI403Response](docs/GetGlobalStatsForAccountAPI403Response.md)
 - [Metric](docs/Metric.md)
 - [Network](docs/Network.md)
 - [Timeframe](docs/Timeframe.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization


Authentication schemes defined for the API:
<a id="apiKeyAuth"></a>
### apiKeyAuth

- **Type**: API key
- **API key parameter name**: X-API-Key
- **Location**: HTTP header




> [!WARNING]
> This project, `analytics-sdk-ts`, is an independent, open-source software development kit designed to interact with Graphtracks API. It is not affiliated with, endorsed by, or sponsored by Bluesky PBC or any of its subsidiaries.
>
> "Bluesky" and related marks are trademarks of their respective owners. Use of these names is solely for descriptive purposes to indicate compatibility and does not imply any official endorsement.
>
> All trademarks and registered trademarks are the property of their respective owners.
