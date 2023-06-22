import React from "react";
import s from "./index.module.css"
import { ReactComponent as Auto } from "../img/auto.svg";




export const Delivery = ()=>{

  return <>
  <div className={s.delivery}>
          <Auto />
          <div>
            <span className={s.text__header}>Доставка по всему Миру! </span>
            <p className={s.text}>Доставка курьером — <span className={s.bold}>  от 399 ₽</span>  </p>
            <p className={s.text}>Доставка в пункт выдачи — <span className={s.bold}> от 199 ₽</span></p>
          </div>
        </div>
  </>
}