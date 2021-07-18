import * as React from "react"
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg viewBox="0 0 233 233" {...props}>
      <Defs>
        <LinearGradient id="prefix__a" x2="50%" x1="50%" y2="100%">
          <Stop stopColor="#111D2E" offset={0} />
          <Stop stopColor="#051839" offset={0.212} />
          <Stop stopColor="#0A1B48" offset={0.407} />
          <Stop stopColor="#132E62" offset={0.581} />
          <Stop stopColor="#144B7E" offset={0.738} />
          <Stop stopColor="#136497" offset={0.873} />
          <Stop stopColor="#1387B8" offset={1} />
        </LinearGradient>
      </Defs>
      <Path
        fill="url(#prefix__a)"
        d="M4.891 150.01C19.284 198.02 63.807 233 116.501 233c64.34 0 116.5-52.16 116.5-116.5 0-64.341-52.16-116.5-116.5-116.5C54.761 0 4.241 48.029.251 108.76c7.54 12.66 10.481 20.49 4.641 41.25z"
      />
      <Path
        fill="#fff"
        d="M110.5 87.322c0 .196 0 .392.01.576L82.002 129.31c-4.618-.21-9.252.6-13.646 2.41a31.698 31.698 0 00-5.455 2.88L.302 108.83s-1.448 23.83 4.588 41.59l44.254 18.26c2.222 9.93 9.034 18.64 19.084 22.83 16.443 6.87 35.402-.96 42.242-17.41 1.78-4.3 2.61-8.81 2.49-13.31l40.79-29.15c.33.01.67.02 1 .02 24.41 0 44.25-19.9 44.25-44.338C199 62.882 179.16 43 154.75 43c-24.4 0-44.25 19.882-44.25 44.322zm-6.84 83.918c-5.294 12.71-19.9 18.74-32.596 13.45-5.857-2.44-10.279-6.91-12.83-12.24l14.405 5.97c9.363 3.9 20.105-.54 23.997-9.9 3.904-9.37-.525-20.13-9.883-24.03l-14.891-6.17c5.746-2.18 12.278-2.26 18.381.28 6.153 2.56 10.927 7.38 13.457 13.54s2.52 12.96-.04 19.1m51.09-54.38c-16.25 0-29.48-13.25-29.48-29.538 0-16.275 13.23-29.529 29.48-29.529 16.26 0 29.49 13.254 29.49 29.529 0 16.288-13.23 29.538-29.49 29.538m-22.09-29.583c0-12.253 9.92-22.191 22.14-22.191 12.23 0 22.15 9.938 22.15 22.191 0 12.254-9.92 22.183-22.15 22.183-12.22 0-22.14-9.929-22.14-22.183z"
      />
    </Svg>
  )
}

export default SvgComponent