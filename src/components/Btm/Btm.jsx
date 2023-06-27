import React from "react";
import s from "./index.module.css"

export const Btm = ({ onClick, backgroundColor, children }) => {
  return <span style={{backgroundColor: {backgroundColor}}} onClick = { onClick } className = { s.btn } > { children }</span>
  
}