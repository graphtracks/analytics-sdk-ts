# GraphTracks Analytics SDK TypeScript Examples

This directory contains example scripts demonstrating how to use the GraphTracks Analytics SDK for TypeScript to fetch BlueSky analytics data.

## Prerequisites

1. **Node.js** (v22 or higher)
2. **TypeScript** and **ts-node** (included as dev dependencies)
3. **GraphTracks API Key** - Get your API key from [GraphTracks](https://graphtracks.com)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set your API key:**
   ```bash
   export GRAPHTRACKS_API_KEY="your-api-key-here"
   ```

   Or create a `.env` file in the project root:
   ```
   GRAPHTRACKS_API_KEY=your-api-key-here
   ```

3. **Optional: Set custom API URL** (defaults to https://api.graphtracks.com):
   ```bash
   export GRAPHTRACKS_API_URL="https://your-custom-api-url.com"
   ```

## Examples

### 1. Get Global Stats for Account

**File:** `get-bluesky-global-stats.ts`

This example demonstrates how to fetch global analytics statistics for a BlueSky account.

**Usage:**
```bash
npx ts-node example/get-bluesky-global-stats.ts <account-did>
```

**Example:**
```bash
npx ts-node example/get-bluesky-global-stats.ts did:plc:wxjvdjftsjkjsemmmqsdyf2t
```

**What it does:**
- Fetches follower statistics for a given BlueSky account
- Uses a 7-day timeframe from May 1st, 2025
- Returns hourly data points (24-hour buckets)
- Supports various metrics: `Followers`, `Likes`, `Reposts`, `Replies`, `Engagement`

**Parameters:**
- `network`: BlueSky (only supported network)
- `accountId`: The account's DID (Decentralized Identifier)
- `metric`: The metric to query (Followers, Likes, etc.)
- `from`: Start date in UTC format
- `timeframe`: Relative time period (7d, 30d, etc.)
- `bucket`: Interval between data points (in seconds)

### 2. Get Per-Post Statistics

**File:** `get-bluesky-per-post-stats.ts`

This example demonstrates a complete workflow for fetching analytics data for specific posts.
Warning: after adding NEW account it might take some time before API will start returning _historical_ data. All new(after account was added) intereactions are returned immidiately.

**Usage:**
```bash
npx ts-node example/get-bluesky-per-post-stats.ts <account-handle>
```

**Example:**
```bash
npx ts-node example/get-bluesky-per-post-stats.ts graphtracks.com
npx ts-node example/get-bluesky-per-post-stats.ts bsky.app
```

**What it does:**
1. **Account Management**: Finds existing network account or creates a new one
2. **Top Posts**: Retrieves the top 10 posts for the account
3. **Post Analytics**: Fetches detailed statistics for the top-performing post
4. **Data Processing**: Shows engagement metrics over time

**Workflow:**
1. Searches for existing account by handle
2. Creates new account if not found
3. Retrieves account details including DID
4. Fetches top posts with engagement metrics
5. Gets time-series data for the top post's likes

**Output includes:**
- Account details (DID, handle, creation date)
- Top posts with engagement metrics (likes, reposts, replies, total engagement)
- Time-series data showing engagement over time

## API Features Demonstrated

### Account Management
- `getNetworkAccounts()` - List all accounts
- `createNetworkAccount()` - Create new account tracking

### Analytics Data
- `getGlobalStatsForAccount()` - Global account statistics
- `getTopPostsForAccount()` - Top performing posts
- `getPostStats()` - Individual post analytics

### Supported Metrics
- **Followers**: Account follower count over time
- **Likes**: Post likes received
- **Reposts**: Post reposts/re-shares
- **Replies**: Post replies/comments
- **Engagement**: Total engagement (likes + reposts + replies)

### Timeframes
- `7d` - 7 days
- `30d` - 30 days
- `90d` - 90 days
- Custom date ranges with `from` and `to` parameters

## Error Handling

The examples include comprehensive error handling:
- API key validation
- Account creation/retrieval errors
- Network request failures
- Data validation

## Output Format

### Global Stats Response
```typescript
{
  data: Array<{
    time: string;    // ISO timestamp
    value: number;   // Metric value
  }>
}
```

### Top Posts Response
```typescript
{
  data: Array<{
    post_id: string;
    likes: string;
    reposts: string;
    replies: string;
    engagement: string;
    indexedAt: string;
    details: {
      uri: string;
      cid: string;
      author: object;
      record: object;
      replyCount: number;
      repostCount: number;
      likeCount: number;
      quoteCount: number;
    }
  }>
}
```

## Troubleshooting

### Common Issues

1. **API Key Not Set**
   ```
   Error: GRAPHTRACKS_API_KEY environment variable is not set.
   ```
   **Solution:** Set the environment variable or create a `.env` file

2. **Account Not Found**
   ```
   Network account not found, creating a new one...
   ```
   **Solution:** This is normal for new accounts - the script will create the account automatically

3. **Invalid Account Handle**
   ```
   Error: Could not retrieve a valid account_id (DID).
   ```
   **Solution:** Ensure the account handle exists on BlueSky

### Rate Limiting
The API includes rate limiting. If you encounter rate limit errors, wait a few seconds before retrying.

## Next Steps

After running these examples, you can:

1. **Modify the scripts** to fetch different metrics or timeframes
2. **Integrate the SDK** into your own applications
3. **Build dashboards** using the time-series data
4. **Analyze trends** across multiple accounts

