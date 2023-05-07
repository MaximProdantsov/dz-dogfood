import React from "react";
import s from "./index.module.css"
import { ReactComponent as Emoticon } from "../img/sadEmoticon.svg";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigation = useNavigate()
  

  return <div className={s.notFound}>
    <Emoticon />
    <div>
      <p className={s.text}>Простите, по Вашему запросу   </p>
      <p className={s.text}> товаров не найдено. </p>

    </div>
    <span className={s.btn} onClick={() => { navigation() }} >На главную</span>

  </div>
}