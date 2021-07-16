import * as React from "react"

function SvgComponent(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={"0 0 422 174"} {...props}>
      <path d="M206 1.8c13 0 50 7.1 50 43.5 0 29.3-14 38-25 40-8 1.5 23 0 23 36.7 0 52-45 50-45 50h-75V1.8zm-30 41.5V69h25s10-1.2 10-13.5-10-12.2-10-12.2zm0 62.7v26h25s10-1 10-14c0-12-10-12-10-12zM0 1.8V172h47v-63h30v63h47V1.8H77V66H47V1.8z" />
      <circle
        cx={335}
        cy={87}
        r={65}
        fill="none"
        stroke="#000"
        strokeWidth={44}
      />
      <circle cx={335} cy={87} r={35} />
    </svg>
  )
}

export default SvgComponent
