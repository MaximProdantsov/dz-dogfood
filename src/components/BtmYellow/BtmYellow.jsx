import React from "react";
import s from "./index.module.css"

export const BtmYellow = ({ onClick, children }) =>{
  return <span onClick={onClick} className={s.btn}>{children}</span>
  
}