import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 35 35"
      {...props}
    >
      <Path
        d="M18.25 31.7l-1.6-4.1 15.4.8-.7 6.6zM22 0L.45 10.2l3.3 15.3h4.4l-.7-11 .6-.2 2.7 11.2h4.5l-.1-13.4.6-.2 2.3 13.6H23l1.1-16.1.7-.3L26 25.5h6.3l2.3-22.4z"
        fill="#fff"
      />
    </Svg>
  )
}

const MemoSvgComponent = React.memo(SvgComponent)
export default MemoSvgComponent
