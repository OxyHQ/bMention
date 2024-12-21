import React from 'react'
import {View} from 'react-native'
import {FAKE_PROFILE_DATA} from 'src/screens/Profile/fakeData.ts'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {atoms as a, useTheme} from '#/alf'
import {Text} from '#/components/Typography'

export function ProfileHeaderMetrics({
  profile,
}: {
  profile: FAKE_PROFILE_DATA.ProfileViewDetailed
}) {
  const t = useTheme()
  const {_} = useLingui()

  return (
    <View style={[a.flex_row, a.gap_lg, a.pt_md]}>
      <View style={[a.flex_1]}>
        <Text style={[a.text_lg, a.font_bold, t.atoms.text]}>
          {profile.followersCount}
        </Text>
        <Text style={[a.text_sm, t.atoms.text_contrast_medium]}>
          <Trans>Followers</Trans>
        </Text>
      </View>
      <View style={[a.flex_1]}>
        <Text style={[a.text_lg, a.font_bold, t.atoms.text]}>
          {profile.followsCount}
        </Text>
        <Text style={[a.text_sm, t.atoms.text_contrast_medium]}>
          <Trans>Following</Trans>
        </Text>
      </View>
      <View style={[a.flex_1]}>
        <Text style={[a.text_lg, a.font_bold, t.atoms.text]}>
          {profile.postsCount}
        </Text>
        <Text style={[a.text_sm, t.atoms.text_contrast_medium]}>
          <Trans>Posts</Trans>
        </Text>
      </View>
    </View>
  )
}
