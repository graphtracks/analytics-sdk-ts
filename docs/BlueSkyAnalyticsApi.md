# BlueSkyAnalyticsApi

All URIs are relative to *https://api.graphtracks.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createNetworkAccount**](#createnetworkaccount) | **POST** /v1/api/networks/account | Create a network account|
|[**deleteNetworkAccount**](#deletenetworkaccount) | **DELETE** /v1/api/networks/accounts/{account_id} | Delete a network account|
|[**getGlobalStatsForAccount**](#getglobalstatsforaccount) | **GET** /v1/api/networks/{network}/accounts/{account_id}/stats/{metric} | Growth rate statistics for account|
|[**getNetworkAccount**](#getnetworkaccount) | **GET** /v1/api/networks/accounts/{account_id} | Get a network account|
|[**getNetworkAccounts**](#getnetworkaccounts) | **GET** /v1/api/networks/accounts | Get network accounts for current user|
|[**getPostInteractions**](#getpostinteractions) | **GET** /v1/api/networks/{network}/accounts/{account_id}/posts/{post_id}/interactions/{metric} | Get post interactions|
|[**getPostStats**](#getpoststats) | **GET** /v1/api/networks/{network}/accounts/{account_id}/posts/{post_id}/stats | Get post statistics|
|[**getTopPostsForAccount**](#gettoppostsforaccount) | **GET** /v1/api/networks/{network}/accounts/{account_id}/top-posts | Get top posts for an account|

# **createNetworkAccount**
> NetworkAccount createNetworkAccount(createNetworkAccountRequest)

Create a network account for the authenticated user.

### Example

```typescript
import {
    BlueSkyAnalyticsApi,
    Configuration,
    CreateNetworkAccountRequest
} from '@graphtracks/client';

const configuration = new Configuration();
const apiInstance = new BlueSkyAnalyticsApi(configuration);

let createNetworkAccountRequest: CreateNetworkAccountRequest; //

const { status, data } = await apiInstance.createNetworkAccount(
    createNetworkAccountRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createNetworkAccountRequest** | **CreateNetworkAccountRequest**|  | |


### Return type

**NetworkAccount**

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully created network account |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - API Key valid but not authorized for this resource |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteNetworkAccount**
> DeleteNetworkAccount201Response deleteNetworkAccount()

Delete a network account from your GraphTracks account.

### Example

```typescript
import {
    BlueSkyAnalyticsApi,
    Configuration
} from '@graphtracks/client';

const configuration = new Configuration();
const apiInstance = new BlueSkyAnalyticsApi(configuration);

let accountId: string; //The account id to get or delete. This is the did of the account for BlueSky. (default to undefined)

const { status, data } = await apiInstance.deleteNetworkAccount(
    accountId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accountId** | [**string**] | The account id to get or delete. This is the did of the account for BlueSky. | defaults to undefined|


### Return type

**DeleteNetworkAccount201Response**

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Network account successfully deleted |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - API Key valid but not authorized for this resource |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getGlobalStatsForAccount**
> Array<DataPoint> getGlobalStatsForAccount()

Get growth rate statistics for account. Timeframe, from or to must be provided.

### Example

```typescript
import {
    BlueSkyAnalyticsApi,
    Configuration
} from '@graphtracks/client';

const configuration = new Configuration();
const apiInstance = new BlueSkyAnalyticsApi(configuration);

let network: Network; //The network to get stats for. Only BlueSky is supported right now. (default to undefined)
let accountId: string; //The account id to get stats for. This is the did of the account for BlueSky. (default to undefined)
let metric: Metric; //The metric to get stats for (default to undefined)
let timeframe: Timeframe; //The timeframe to get stats for. If to and from are not provided, will return now - Timeframe. (optional) (default to undefined)
let from: string; // (optional) (default to undefined)
let to: string; //The end date of the timeframe. If not provided, timeframe and from must be provided. (optional) (default to undefined)
let bucket: number; //bucket size. Interval in seconds between data points. Data points will be aggregated into this bucket size. (optional) (default to 3600)

const { status, data } = await apiInstance.getGlobalStatsForAccount(
    network,
    accountId,
    metric,
    timeframe,
    from,
    to,
    bucket
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **network** | **Network** | The network to get stats for. Only BlueSky is supported right now. | defaults to undefined|
| **accountId** | [**string**] | The account id to get stats for. This is the did of the account for BlueSky. | defaults to undefined|
| **metric** | **Metric** | The metric to get stats for | defaults to undefined|
| **timeframe** | **Timeframe** | The timeframe to get stats for. If to and from are not provided, will return now - Timeframe. | (optional) defaults to undefined|
| **from** | [**string**] |  | (optional) defaults to undefined|
| **to** | [**string**] | The end date of the timeframe. If not provided, timeframe and from must be provided. | (optional) defaults to undefined|
| **bucket** | [**number**] | bucket size. Interval in seconds between data points. Data points will be aggregated into this bucket size. | (optional) defaults to 3600|


### Return type

**Array<DataPoint>**

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Account growth rate stats. Time series data points for the given metric. |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - API Key valid but not authorized for this resource |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getNetworkAccount**
> NetworkAccount getNetworkAccount()

Get details for a specific network account.

### Example

```typescript
import {
    BlueSkyAnalyticsApi,
    Configuration
} from '@graphtracks/client';

const configuration = new Configuration();
const apiInstance = new BlueSkyAnalyticsApi(configuration);

let accountId: string; //The account id to get or delete. This is the did of the account for BlueSky. (default to undefined)

const { status, data } = await apiInstance.getNetworkAccount(
    accountId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accountId** | [**string**] | The account id to get or delete. This is the did of the account for BlueSky. | defaults to undefined|


### Return type

**NetworkAccount**

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Network account details |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - API Key valid but not authorized for this resource |  -  |
|**404** | Account not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getNetworkAccounts**
> Array<NetworkAccount> getNetworkAccounts()

Get all network accounts associated with the authenticated user.

### Example

```typescript
import {
    BlueSkyAnalyticsApi,
    Configuration
} from '@graphtracks/client';

const configuration = new Configuration();
const apiInstance = new BlueSkyAnalyticsApi(configuration);

const { status, data } = await apiInstance.getNetworkAccounts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<NetworkAccount>**

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of network accounts |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - API Key valid but not authorized for this resource |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPostInteractions**
> Array<Interaction> getPostInteractions()

Get detailed interaction data for a specific post, including user profiles who interacted.

### Example

```typescript
import {
    BlueSkyAnalyticsApi,
    Configuration
} from '@graphtracks/client';

const configuration = new Configuration();
const apiInstance = new BlueSkyAnalyticsApi(configuration);

let network: Network; //The network to get stats for. Only BlueSky is supported right now. (default to undefined)
let accountId: string; //The account id that owns the post. This is the did of the account for BlueSky. (default to undefined)
let postId: string; //The post id to get interactions for (default to undefined)
let metric: Metric; //The type of interaction to retrieve (default to undefined)
let timeframe: Timeframe; //The timeframe to get interactions for (default to undefined)
let from: string; //The start date of the timeframe (default to undefined)
let to: string; //The end date of the timeframe (optional) (default to undefined)
let limit: number; //Maximum number of interactions to return (optional) (default to 10)
let offset: number; //Offset for pagination (optional) (default to undefined)
let sort: 'asc' | 'desc'; //Sort order for interactions (optional) (default to 'desc')

const { status, data } = await apiInstance.getPostInteractions(
    network,
    accountId,
    postId,
    metric,
    timeframe,
    from,
    to,
    limit,
    offset,
    sort
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **network** | **Network** | The network to get stats for. Only BlueSky is supported right now. | defaults to undefined|
| **accountId** | [**string**] | The account id that owns the post. This is the did of the account for BlueSky. | defaults to undefined|
| **postId** | [**string**] | The post id to get interactions for | defaults to undefined|
| **metric** | **Metric** | The type of interaction to retrieve | defaults to undefined|
| **timeframe** | **Timeframe** | The timeframe to get interactions for | defaults to undefined|
| **from** | [**string**] | The start date of the timeframe | defaults to undefined|
| **to** | [**string**] | The end date of the timeframe | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of interactions to return | (optional) defaults to 10|
| **offset** | [**number**] | Offset for pagination | (optional) defaults to undefined|
| **sort** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** | Sort order for interactions | (optional) defaults to 'desc'|


### Return type

**Array<Interaction>**

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of interactions with user profiles |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - API Key valid but not authorized for this resource |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPostStats**
> Array<DataPoint> getPostStats()

Get time series statistics for a specific post. Requires metric, timeframe, and from parameters.

### Example

```typescript
import {
    BlueSkyAnalyticsApi,
    Configuration
} from '@graphtracks/client';

const configuration = new Configuration();
const apiInstance = new BlueSkyAnalyticsApi(configuration);

let network: Network; //The network to get stats for. Only BlueSky is supported right now. (default to undefined)
let accountId: string; //The account id that owns the post. This is the did of the account for BlueSky. (default to undefined)
let postId: string; //The post id to get stats for (default to undefined)
let metric: Metric; //The metric to get stats for (default to undefined)
let timeframe: Timeframe; //The timeframe to get stats for (default to undefined)
let from: string; //The start date of the timeframe (default to undefined)
let bucket: number; //Bucket size. Interval in seconds between data points. Data points will be aggregated into this bucket size. (optional) (default to 3600)

const { status, data } = await apiInstance.getPostStats(
    network,
    accountId,
    postId,
    metric,
    timeframe,
    from,
    bucket
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **network** | **Network** | The network to get stats for. Only BlueSky is supported right now. | defaults to undefined|
| **accountId** | [**string**] | The account id that owns the post. This is the did of the account for BlueSky. | defaults to undefined|
| **postId** | [**string**] | The post id to get stats for | defaults to undefined|
| **metric** | **Metric** | The metric to get stats for | defaults to undefined|
| **timeframe** | **Timeframe** | The timeframe to get stats for | defaults to undefined|
| **from** | [**string**] | The start date of the timeframe | defaults to undefined|
| **bucket** | [**number**] | Bucket size. Interval in seconds between data points. Data points will be aggregated into this bucket size. | (optional) defaults to 3600|


### Return type

**Array<DataPoint>**

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Post statistics time series data |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - API Key valid but not authorized for this resource |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTopPostsForAccount**
> Array<PostsInner> getTopPostsForAccount()

Get the top performing posts for an account within a specified timeframe.

### Example

```typescript
import {
    BlueSkyAnalyticsApi,
    Configuration
} from '@graphtracks/client';

const configuration = new Configuration();
const apiInstance = new BlueSkyAnalyticsApi(configuration);

let network: Network; //The network to get stats for. Only BlueSky is supported right now. (default to undefined)
let accountId: string; //The account id to get top posts for. This is the did of the account for BlueSky. (default to undefined)
let timeframe: Timeframe; //The timeframe to analyze for top posts (optional) (default to undefined)
let limit: number; //Maximum number of top posts to return (optional) (default to 10)

const { status, data } = await apiInstance.getTopPostsForAccount(
    network,
    accountId,
    timeframe,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **network** | **Network** | The network to get stats for. Only BlueSky is supported right now. | defaults to undefined|
| **accountId** | [**string**] | The account id to get top posts for. This is the did of the account for BlueSky. | defaults to undefined|
| **timeframe** | **Timeframe** | The timeframe to analyze for top posts | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of top posts to return | (optional) defaults to 10|


### Return type

**Array<PostsInner>**

### Authorization

[apiKeyAuth](../README.md#apiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of top posts with their engagement metrics |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - API Key valid but not authorized for this resource |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

