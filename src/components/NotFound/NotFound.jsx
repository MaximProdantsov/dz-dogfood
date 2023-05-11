import React from "react";
import s from "./index.module.css"
import { ReactComponent as Emoticon } from "../img/sadEmoticon.svg";

export const NotFound = ({setSearch}) => {
  
  
  
  

  return <div className={s.notFound}>
    <Emoticon />
    <div>
      <p className={s.text}>Простите, по Вашему запросу   </p>
      <p className={s.text}> товаров не найдено. </p>

    </div>
    <span className={s.btn} onClick={() => {setSearch('')}} >На главную</span>

  </div>
}