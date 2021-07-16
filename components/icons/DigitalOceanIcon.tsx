import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      id="prefix__Layer_1"
      x={0}
      y={0}
      viewBox="67 175.2 176.4 176.5"
      {...props}
    >
      <G id="prefix__XMLID_229_">
        <G id="prefix__XMLID_690_">
          <G id="prefix__XMLID_691_">
            <G id="prefix__XMLID_44_">
              <G id="prefix__XMLID_48_">
                <Path
                  id="prefix__XMLID_49_"
                  fill={"#FFFFFF"}
                  d="M155.2 351.7v-34.2c36.2 0 64.3-35.9 50.4-74-5.1-14.1-16.4-25.4-30.5-30.5-38.1-13.8-74 14.2-74 50.4H67c0-57.7 55.8-102.7 116.3-83.8 26.4 8.3 47.5 29.3 55.7 55.7 18.9 60.6-26 116.4-83.8 116.4z"
                />
              </G>
              <Path
                id="prefix__XMLID_47_"
                fill={"#FFFFFF"}
                d="M155.3 317.6h-34v-34h34z"
              />
              <Path
                id="prefix__XMLID_46_"
                fill={"#FFFFFF"}
                d="M121.3 343.8H95.1v-26.2h26.2z"
              />
              <Path
                id="prefix__XMLID_45_"
                fill={"#FFFFFF"}
                d="M95.1 317.6H73.2v-21.9h21.9v21.9z"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
