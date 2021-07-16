import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      id="prefix__Layer_1"
      x={0}
      y={0}
      viewBox="0 0 2400 2800"
      {...props}
    >
      <G id="prefix__Layer_1-2">
        <Path
          fill={"#FFFFFF"}
          d="M500 0L0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300l-400 400h-400l-350 350v-350H600V200h1600v1100z"
        />
        <Path
          fill={"#FFFFFF"}
          d="M1700 550h200v600h-200zM1150 550h200v600h-200z"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
