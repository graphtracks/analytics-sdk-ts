# NetworkAccount


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**account_id** | **string** | The account id (did for BlueSky) | [default to undefined]
**account_handle** | **string** | The account handle | [default to undefined]
**account_internal_id** | **number** | The internal id used by GraphTracks | [default to undefined]
**active** | **boolean** | Whether the account is active | [default to undefined]
**created_at** | **string** | The timestamp for when the account was created | [default to undefined]
**updated_at** | **string** | The timestamp for when the account was last updated | [default to undefined]
**network** | **string** | The network this account belongs to | [optional] [default to undefined]

## Example

```typescript
import { NetworkAccount } from '@graphtracks/client';

const instance: NetworkAccount = {
    account_id,
    account_handle,
    account_internal_id,
    active,
    created_at,
    updated_at,
    network,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
