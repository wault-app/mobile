import * as React from "react"
import Svg, { SvgProps, G, ClipPath, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 170.05 170.05"
      {...props}
    >
      <G data-name="Layer 1">
        <ClipPath id="prefix__a">
          <Path
            transform="matrix(1 0 0 -1 0 170.05)"
            d="M0 170.05h170.05V0H0z"
          />
        </ClipPath>
        <G clipPath="url(#prefix__a)">
          <Path
            d="M134.562 75.522c-26.994-16.031-71.52-17.505-97.29-9.684-4.138 1.256-8.514-1.08-9.767-5.218a7.835 7.835 0 015.22-9.772c29.582-8.98 78.756-7.245 109.832 11.202a7.832 7.832 0 012.737 10.733c-2.208 3.722-7.02 4.949-10.732 2.739m-.884 23.744c-1.894 3.073-5.912 4.037-8.981 2.15-22.504-13.833-56.822-17.841-83.447-9.76a6.539 6.539 0 01-8.148-4.35 6.538 6.538 0 014.354-8.141c30.415-9.23 68.226-4.76 94.074 11.125 3.069 1.89 4.035 5.91 2.148 8.976m-10.247 22.803a5.215 5.215 0 01-7.177 1.737c-19.665-12.02-44.417-14.733-73.567-8.075a5.216 5.216 0 01-6.25-3.924 5.213 5.213 0 013.926-6.25c31.9-7.292 59.263-4.154 81.336 9.334a5.22 5.22 0 011.732 7.178M85.025 1.282c-46.25 0-83.743 37.493-83.743 83.742 0 46.254 37.494 83.745 83.743 83.745 46.25 0 83.744-37.491 83.744-83.745 0-46.25-37.493-83.742-83.744-83.742"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent