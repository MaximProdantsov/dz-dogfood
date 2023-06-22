import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificatorActiv } from "../../storage/slice/notificatorSlice";
import s from "./index.module.css"




export const Notificator = () => {

  const dispatch = useDispatch()
  const { NotificatorActiv, text } = useSelector(s => s.notificator)

  useEffect(() => {
      const timeotId= setTimeout(() => {
        dispatch(setNotificatorActiv(false));
      }, 3000);
      return ()=>clearTimeout(timeotId)
  }, [ NotificatorActiv, dispatch])
  
  return <>
    {NotificatorActiv && <div onClick={() => dispatch(setNotificatorActiv(false))} className={s.container}>
      <div className={s.notFound__wrapper}>
        <div className={s.notFound__title}>{text}</div>
      </div>
    </div>}
  </>
}