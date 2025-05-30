# BlueSkyAnalyticsApi

All URIs are relative to *https://api.graphtracks.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getGlobalStatsForAccountAPI**](#getglobalstatsforaccountapi) | **GET** /v1/api/networks/{network}/accounts/{account_id}/stats/{metric} | Growth rate statistics for account|

# **getGlobalStatsForAccountAPI**
> Array<DataPoint> getGlobalStatsForAccountAPI()

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
let from: string; //The start date of the timeframe. If not provided, timeframe and to must be provided. (optional) (default to undefined)
let to: string; //The end date of the timeframe. If not provided, timeframe and from must be provided. (optional) (default to undefined)
let bucket: string; //bucket size. Interval in seconds between data points. Data points will be aggregated into this bucket size. Must be provided as string (optional) (default to '3600')

const { status, data } = await apiInstance.getGlobalStatsForAccountAPI(
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
| **from** | [**string**] | The start date of the timeframe. If not provided, timeframe and to must be provided. | (optional) defaults to undefined|
| **to** | [**string**] | The end date of the timeframe. If not provided, timeframe and from must be provided. | (optional) defaults to undefined|
| **bucket** | [**string**] | bucket size. Interval in seconds between data points. Data points will be aggregated into this bucket size. Must be provided as string | (optional) defaults to '3600'|


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
|**401** | Unauthorized |  -  |
|**403** | Forbidden - API Key valid but not authorized for this account or resource. |  -  |
|**500** | Internal server error |  -  |
|**400** | Bad request |  -  |
|**200** | Account growth rate stats. Time series data points for the given metric. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

