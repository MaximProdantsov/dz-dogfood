import React from "react";
import s from "./index.module.css"
import { ReactComponent as Emoticon } from "../img/sadEmoticon.svg";
import { useDispatch } from "react-redux";
import { setSearch } from "../../storage/slice/searchSlice";
import { Link } from "react-router-dom";

export const NotFound = () => {
  const dispatch = useDispatch()
          return <div className={s.notFound}>
    <Emoticon />
    <div>
      <p className={s.text}>Простите, по Вашему запросу   </p>
      <p className={s.text}> товаров не найдено. </p>

    </div>
    <Link to='/'>
    <span className={s.btn} onClick={() => {dispatch(setSearch(''))}} >На главную</span>
    </Link>

  </div>
}