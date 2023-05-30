import * as React from "react"
import style from './IconCross.module.css'
const IconCross = ({width=18, height=18}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} >
    <path
      fill="#494C6B"
      fillRule="evenodd"
      d="m16.97 0 .708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      className={style.IconCross}/>
  </svg>
)
export default IconCross
