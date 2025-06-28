# PostsInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**post_id** | **string** | The post identifier | [optional] [default to undefined]
**likes** | **number** | The number of likes on the post | [optional] [default to undefined]
**reposts** | **number** | The number of reposts | [optional] [default to undefined]
**replies** | **number** | The number of replies | [optional] [default to undefined]
**engagement** | **number** | The total engagement metric | [optional] [default to undefined]
**details** | **object** | Additional post details | [optional] [default to undefined]
**indexedAt** | **string** | The timestamp for when the post was indexed | [optional] [default to undefined]

## Example

```typescript
import { PostsInner } from '@graphtracks/client';

const instance: PostsInner = {
    post_id,
    likes,
    reposts,
    replies,
    engagement,
    details,
    indexedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
