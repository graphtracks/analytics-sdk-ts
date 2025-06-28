# CreateNetworkAccountRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**account_handle** | **string** | The account handle to create (e.g., \&#39;graphtracks.com\&#39;) | [default to undefined]
**network** | **string** | The network to create an account for. Only BlueSky is supported right now. | [optional] [default to NetworkEnum_BlueSky]

## Example

```typescript
import { CreateNetworkAccountRequest } from '@graphtracks/client';

const instance: CreateNetworkAccountRequest = {
    account_handle,
    network,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
