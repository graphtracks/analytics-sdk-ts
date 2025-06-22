# User


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | The user id | [optional] [default to undefined]
**external_id** | **string** | The external id | [default to undefined]
**created_at** | **string** | The timestamp for when the user was created | [optional] [default to undefined]
**updated_at** | **string** | The timestamp for when the user was last updated | [optional] [default to undefined]
**details** | [**UserDetails**](UserDetails.md) |  | [optional] [default to undefined]

## Example

```typescript
import { User } from '@graphtracks/client';

const instance: User = {
    id,
    external_id,
    created_at,
    updated_at,
    details,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
