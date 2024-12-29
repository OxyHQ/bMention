export const ChatBskyConvoDefs = {
  MessageView: {
    id: '1',
    text: 'Hello, this is a fake message',
    facets: [],
    sender: {
      did: 'did:example:123',
    },
  },
}

export const AppBskyActorDefs = {
  ProfileViewBasic: {
    did: 'did:example:123',
    handle: 'example',
  },
}

export const ModerationCause = {
  listBlocks: [],
  userBlock: undefined,
}

export const RichText = class {
  text: string
  facets: any[]

  constructor({text}: {text: string}) {
    this.text = text
    this.facets = []
  }
}

export const AppBskyFeedGetLikes = {
  Like: {
    actor: {
      did: 'did:example:123',
    },
  },
}

export const AppBskyGraphDefs = {
  ListView: {
    name: 'Example List',
    creator: {
      did: 'did:example:123',
      handle: 'example',
    },
    purpose: 'examplePurpose',
    avatar: 'exampleAvatar',
    description: 'Example description',
  },
}

export const AppBskyEmbedExternal = {}
export const AppBskyEmbedImages = {}
export const AppBskyEmbedRecordWithMedia = {}
export const AppBskyEmbedVideo = {}

export const moderateProfile = (profile, opts) => {
  return {
    ui: type => ({
      alerts: [],
      blur: false,
    }),
  }
}

export const AppBskyLabelerDefs = {
  LabelerViewDetailed: {
    creator: {
      did: 'did:example:123',
    },
  },
}

export const AppBskyGraphStarterpack = {
  isRecord: record => true,
}

export const AppBskyFeedDefs = {
  FeedViewPost: {
    post: {
      uri: 'exampleUri',
      author: {
        did: 'did:example:123',
      },
      record: {
        reply: {
          parent: {
            uri: 'exampleParentUri',
          },
        },
      },
    },
  },
}

export const AppBskyFeedPost = {
  isRecord: record => true,
  validateRecord: record => ({success: true}),
}

export const BskyAgent = class {
  assertDid = 'did:example:123'
}

export const ComAtprotoRepoUploadBlob = {
  Response: {
    data: {
      blob: 'exampleBlob',
    },
  },
}

export const AtUri = class {
  constructor(uri) {
    this.uri = uri
    this.rkey = uri.split('/').pop()
  }
}

export const moderateUserList = (view, opts) => {
  return {
    ui: type => ({
      alerts: [],
      blur: false,
    }),
  }
}

export const ModerationUI = class {
  alerts: any[]
  blur: boolean

  constructor() {
    this.alerts = []
    this.blur = false
  }

  ui(type) {
    return {
      alerts: this.alerts,
      blur: this.blur,
    }
  }
}
