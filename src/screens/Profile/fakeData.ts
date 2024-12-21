export const FAKE_PROFILE_DATA = {
  ProfileViewDetailed: {
    did: 'did:example:123',
    handle: 'example.handle',
    displayName: 'Example User',
    description: 'This is a fake profile description.',
    avatar: 'https://example.com/avatar.jpg',
    banner: 'https://example.com/banner.jpg',
    followersCount: 100,
    followsCount: 50,
    postsCount: 10,
    viewer: {
      blocking: false,
      blockedBy: false,
      following: true,
      followedBy: true,
    },
    associated: {
      labeler: true,
      feedgens: 2,
      lists: 3,
    },
    labels: [],
  },
  LabelerViewDetailed: {
    uri: 'https://example.com/labeler',
    cid: 'cid:example:123',
    creator: {
      did: 'did:example:labeler',
      handle: 'labeler.handle',
    },
    likeCount: 10,
    viewer: {
      like: 'like:example:123',
    },
    policies: {
      labelValues: ['value1', 'value2'],
    },
  },
  ModerationOpts: {
    blur: false,
    noOverride: false,
  },
  RichText: class {
    constructor({ text }) {
      this.text = text;
    }
    detectFacets() {
      return Promise.resolve();
    }
  },
};
