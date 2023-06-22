import React from "react";
import s from './index.module.css'

export const Loading = () => {


  return <>
  <div >
    <div className={s.ring}>
    Загрузка
  <span className={s.span}></span>
    </div>
  </div>
  </>
}