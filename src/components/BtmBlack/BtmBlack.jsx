import React from "react";
import { useNavigate } from "react-router";
import s from "./index.module.css"

export const BtmBlack = () =>{
  const navigation = useNavigate()
  return <div className={s.favoritesPage}>
      <span className={s.btm__black} onClick={() => { navigation('/') }}>{"<"} Назад</span>
  </div>
}