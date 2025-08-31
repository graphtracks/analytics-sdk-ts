# Graphtracks client

**TypeScript SDK for Bluesky Social Media Analytics** - analytics client library that enables developers to access detailed Bluesky social network statistics, user engagement metrics, and growth analytics through the GraphTracks API.

## Features

* Get stats for a given account by DID
* Growth Stats are available for the following metrics:
  * Followers
  * Replies
  * Reposts
  * Likes
* Growth Stats available per post:
  * replies
  * reposts
  * likes
* Account interactions API
* Top posts by engagement API

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

## Getting started

To get started, create account on <www.graphtracks.com>.

Create new API key <https://www.graphtracks.com/dashboard/developer/apikeys>

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
api.getGlobalStatsForAccount({
    network: Network.BlueSky, // Only Bluesky is supported 
    accountId: did, // atproto account did
    metric: Metric.Followers, // Metric to query
    from: '2025-05-01', // Start date in UTC
    timeframe: Timeframe._7d, // relative amount of time since `from` to get metric
    // to: '2025-05-07', // End date in UTC. Cannot be passed together with timeframe
    bucket: 3600 * 24, // Interval between datapoints. It is recommended to keep datapoints count low both for UX and performance
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

# Examples

Pleas check our [./example]  folder for more detailed examples.

### Documentation for API Endpoints

All URIs are relative to *<https://api.graphtracks.com>*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*BlueSkyAnalyticsApi* | [**createNetworkAccount**](docs/BlueSkyAnalyticsApi.md#createnetworkaccount) | **POST** /v1/api/networks/account | Create a network account
*BlueSkyAnalyticsApi* | [**deleteNetworkAccount**](docs/BlueSkyAnalyticsApi.md#deletenetworkaccount) | **DELETE** /v1/api/networks/accounts/{account_id} | Delete a network account
*BlueSkyAnalyticsApi* | [**getGlobalStatsForAccount**](docs/BlueSkyAnalyticsApi.md#getglobalstatsforaccount) | **GET** /v1/api/networks/{network}/accounts/{account_id}/stats/{metric} | Growth rate statistics for account
*BlueSkyAnalyticsApi* | [**getNetworkAccount**](docs/BlueSkyAnalyticsApi.md#getnetworkaccount) | **GET** /v1/api/networks/accounts/{account_id} | Get a network account
*BlueSkyAnalyticsApi* | [**getNetworkAccounts**](docs/BlueSkyAnalyticsApi.md#getnetworkaccounts) | **GET** /v1/api/networks/accounts | Get network accounts for current user
*BlueSkyAnalyticsApi* | [**getPostInteractions**](docs/BlueSkyAnalyticsApi.md#getpostinteractions) | **GET** /v1/api/networks/{network}/accounts/{account_id}/posts/{post_id}/interactions/{metric} | Get post interactions
*BlueSkyAnalyticsApi* | [**getPostStats**](docs/BlueSkyAnalyticsApi.md#getpoststats) | **GET** /v1/api/networks/{network}/accounts/{account_id}/posts/{post_id}/stats | Get post statistics
*BlueSkyAnalyticsApi* | [**getTopPostsForAccount**](docs/BlueSkyAnalyticsApi.md#gettoppostsforaccount) | **GET** /v1/api/networks/{network}/accounts/{account_id}/top-posts | Get top posts for an account

### Documentation For Models

* [CreateNetworkAccountRequest](docs/CreateNetworkAccountRequest.md)
* [DataPoint](docs/DataPoint.md)
* [DeleteNetworkAccount201Response](docs/DeleteNetworkAccount201Response.md)
* [GetNetworkAccount404Response](docs/GetNetworkAccount404Response.md)
* [Interaction](docs/Interaction.md)
* [Metric](docs/Metric.md)
* [Network](docs/Network.md)
* [NetworkAccount](docs/NetworkAccount.md)
* [Post](docs/Post.md)
* [PostData](docs/PostData.md)
* [PostsInner](docs/PostsInner.md)
* [Timeframe](docs/Timeframe.md)

<a id="documentation-for-authorization"></a>

## Documentation For Authorization

Authentication schemes defined for the API:
<a id="apiKeyAuth"></a>

### apiKeyAuth

* **Type**: API key
* **API key parameter name**: X-API-Key
* **Location**: HTTP header

> [!WARNING]
> This project, `analytics-sdk-ts`, is an independent, open-source software development kit designed to interact with Graphtracks API. It is not affiliated with, endorsed by, or sponsored by Bluesky PBC or any of its subsidiaries.
>
> "Bluesky" and related marks are trademarks of their respective owners. Use of these names is solely for descriptive purposes to indicate compatibility and does not imply any official endorsement.
>
> All trademarks and registered trademarks are the property of their respective owners.
