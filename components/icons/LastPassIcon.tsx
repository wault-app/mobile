import * as React from "react"
import Svg, { SvgProps, G, Path, Circle } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg viewBox={"0 0 64 64"} {...props}>
      <G fill="#ffffff">
        <Path d="M60.552 18.207a1.725 1.725 0 113.449 0v27.586a1.725 1.725 0 11-3.45 0z" />
        <G transform="matrix(.74964 0 0 .74964 0 26.82)">
          <Circle cx={7.8} cy={7.8} r={7.8} />
          <Circle cx={33.8} cy={7.8} r={7.8} />
          <Circle cx={59.8} cy={7.8} r={7.8} />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
