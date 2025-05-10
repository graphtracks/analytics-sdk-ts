# Graphtracks Client


Graphtracks API definition can be found in [openapi.yaml](./openapi.yaml)

API's can be used directly or with provided SDK

Running [example](./example/index.ts):

```bash

export GRAPHTRACKS_API_KEY=gt_blahblah
npx ts-node example/index.ts did:plc:1123123123123sdf3434d344
```
will output

```
[
  { event_time: '2025-05-01 00:00:00', count: '693' },
  { event_time: '2025-05-02 00:00:00', count: '926' },
  { event_time: '2025-05-03 00:00:00', count: '1013' },
  { event_time: '2025-05-04 00:00:00', count: '644' },
  { event_time: '2025-05-05 00:00:00', count: '782' },
  { event_time: '2025-05-06 00:00:00', count: '633' },
  { event_time: '2025-05-07 00:00:00', count: '647' }
]
```




> [!WARNING]
> This project, `analytics-sdk`, is an independent, open-source software development kit designed to interact with Graphtracks API. It is not affiliated with, endorsed by, or sponsored by Bluesky PBC or any of its subsidiaries.
>
> "Bluesky" and related marks are trademarks of their respective owners. Use of these names is solely for descriptive purposes to indicate compatibility and does not imply any official endorsement.
>
> All trademarks and registered trademarks are the property of their respective owners.
