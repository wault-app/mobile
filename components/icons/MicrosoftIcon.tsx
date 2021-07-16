import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg viewBox="0 0 23 23" {...props}>
      <Path fill="#f35325" d="M1 1h10v10H1z" />
      <Path fill="#81bc06" d="M12 1h10v10H12z" />
      <Path fill="#05a6f0" d="M1 12h10v10H1z" />
      <Path fill="#ffba08" d="M12 12h10v10H12z" />
    </Svg>
  )
}

export default SvgComponent
