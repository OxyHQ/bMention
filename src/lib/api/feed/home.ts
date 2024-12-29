// Remove import of @atproto/api
// import {AppBskyFeedDefs, BskyAgent} from '@atproto/api'

import {FeedAPI} from './types'

// Define fake data types and constants
type FeedViewPost = {
  post: {
    uri: string
    cid: string
    record: object
    author: {
      did: string
      handle: string
    }
    indexedAt: string
  }
}

const PROD_DEFAULT_FEED = (feed: string) => `default-feed-${feed}`

// HACK
// the feed API does not include any facilities for passing down
// non-post elements. adding that is a bit of a heavy lift, and we
// have just one temporary usecase for it: flagging when the home feed
// falls back to discover.
// we use this fallback marker post to drive this instead. see Feed.tsx
// for the usage.
// -prf
export const FALLBACK_MARKER_POST: FeedViewPost = {
  post: {
    uri: 'fallback-marker-post',
    cid: 'fake',
    record: {},
    author: {
      did: 'did:fake',
      handle: 'fake.com',
    },
    indexedAt: new Date().toISOString(),
  },
}

class FollowingFeedAPI {
  // ...existing code...
  async peekLatest(): Promise<FeedViewPost> {
    return {
      post: {
        uri: 'latest-following-post',
        cid: 'fake',
        record: {},
        author: {
          did: 'did:fake',
          handle: 'fake.com',
        },
        indexedAt: new Date().toISOString(),
      },
    }
  }

  async fetch({
    cursor,
    limit,
  }: {
    cursor: string | undefined
    limit: number
  }): Promise<{cursor: string; feed: FeedViewPost[]}> {
    return {
      cursor: 'next-cursor',
      feed: Array(limit).fill({
        post: {
          uri: 'following-post',
          cid: 'fake',
          record: {},
          author: {
            did: 'did:fake',
            handle: 'fake.com',
          },
          indexedAt: new Date().toISOString(),
        },
      }),
    }
  }
}

class CustomFeedAPI {
  // ...existing code...
  async peekLatest(): Promise<FeedViewPost> {
    return {
      post: {
        uri: 'latest-custom-post',
        cid: 'fake',
        record: {},
        author: {
          did: 'did:fake',
          handle: 'fake.com',
        },
        indexedAt: new Date().toISOString(),
      },
    }
  }

  async fetch({
    cursor,
    limit,
  }: {
    cursor: string | undefined
    limit: number
  }): Promise<{cursor: string; feed: FeedViewPost[]}> {
    return {
      cursor: 'next-cursor',
      feed: Array(limit).fill({
        post: {
          uri: 'custom-post',
          cid: 'fake',
          record: {},
          author: {
            did: 'did:fake',
            handle: 'fake.com',
          },
          indexedAt: new Date().toISOString(),
        },
      }),
    }
  }
}

export class HomeFeedAPI implements FeedAPI {
  agent: any
  following: FollowingFeedAPI
  discover: CustomFeedAPI
  usingDiscover = false
  itemCursor = 0
  userInterests?: string

  constructor({userInterests, agent}: {userInterests?: string; agent: any}) {
    this.agent = agent
    this.following = new FollowingFeedAPI()
    this.discover = new CustomFeedAPI()
    this.userInterests = userInterests
  }

  reset() {
    this.following = new FollowingFeedAPI()
    this.discover = new CustomFeedAPI()
    this.usingDiscover = false
    this.itemCursor = 0
  }

  async peekLatest(): Promise<FeedViewPost> {
    if (this.usingDiscover) {
      return this.discover.peekLatest()
    }
    return this.following.peekLatest()
  }

  async fetch({
    cursor,
    limit,
  }: {
    cursor: string | undefined
    limit: number
  }): Promise<{cursor: string; feed: FeedViewPost[]}> {
    if (!cursor) {
      this.reset()
    }

    let returnCursor
    let posts: FeedViewPost[] = []

    if (!this.usingDiscover) {
      const res = await this.following.fetch({cursor, limit})
      returnCursor = res.cursor
      posts = posts.concat(res.feed)
      if (!returnCursor) {
        cursor = ''
        posts.push(FALLBACK_MARKER_POST)
        this.usingDiscover = true
      }
    }

    if (this.usingDiscover) {
      const res = await this.discover.fetch({cursor, limit})
      returnCursor = res.cursor
      posts = posts.concat(res.feed)
    }

    return {
      cursor: returnCursor,
      feed: posts,
    }
  }
}
