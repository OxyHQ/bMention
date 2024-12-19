import React from 'react'
import {StyleSheet, TextProps} from 'react-native'
import Svg, {
  Defs,
  LinearGradient,
  Path,
  PathProps,
  Stop,
  SvgProps,
} from 'react-native-svg'
import {Image} from 'expo-image'

import {colors} from '#/lib/styles'
import {useKawaiiMode} from '#/state/preferences/kawaii'

const ratio = 57 / 64

type Props = {
  fill?: PathProps['fill']
  style?: TextProps['style']
} & Omit<SvgProps, 'style'>

export const Logo = React.forwardRef(function LogoImpl(props: Props, ref) {
  const {fill, ...rest} = props
  const gradient = fill === 'sky'
  const styles = StyleSheet.flatten(props.style)
  const _fill = gradient ? 'url(#sky)' : fill || styles?.color || colors.blue3
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32)

  const isKawaii = useKawaiiMode()

  if (isKawaii) {
    return (
      <Image
        source={
          size > 100
            ? require('../../../assets/kawaii.png')
            : require('../../../assets/kawaii_smol.png')
        }
        accessibilityLabel="Mention"
        accessibilityHint=""
        accessibilityIgnoresInvertColors
        style={[{height: size, aspectRatio: 1.4}]}
      />
    )
  }

  return (
    <Svg
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      viewBox="0 0 196 196"
      {...rest}
      style={[{width: size, height: size * ratio}, styles]}>
      {gradient && (
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#0A7AFF" stopOpacity="1" />
            <Stop offset="1" stopColor="#59B9FF" stopOpacity="1" />
          </LinearGradient>
        </Defs>
      )}

      <Path
        fill={_fill}
        d="M 131.991 97.92 L 131.991 194.648 L 163.437 194.648 L 194.883 194.648 L 194.883 97.92 L 194.883 1.192 L 163.437 1.192 L 131.991 1.192 L 131.991 97.92 M 62.299 97.071 L 62.299 174.284 L 87.795 174.284 L 113.294 174.284 L 113.294 97.071 L 113.294 19.86 L 87.795 19.86 L 62.299 19.86 L 62.299 97.071 M 1.108 97.92 L 1.108 153.921 L 22.355 153.921 L 43.603 153.921 L 43.603 97.92 L 43.603 41.92 L 22.355 41.92 L 1.108 41.92 L 1.108 97.92"
      />
    </Svg>
  )
})
