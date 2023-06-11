import React from "react";
import { useForm } from "react-hook-form";
import s from "./index.module.css"
import { useContext } from "react";
import { CardsContext } from "../../context/context";
import { useState } from "react";
import { api } from "../../api/api";
import { ReactComponent as EveOpen } from "../img/eye-open.svg";
import { ReactComponent as EveClose } from "../img/eye-close.svg";


export const PasswordRecovery = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({});
  const { setModalActiv } = useContext(CardsContext)
  const [haveToken, setHaveToken] = useState(false)
  const [isShown, setIsSHown] = useState(false);


  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  }


  const onSubmit = async (data) => {
    if (haveToken) {
      try {
        console.log(data);
        const res = await api.addPasswordResetToken({ password: data.password }, data.token);
        localStorage.setItem('token', res.token)

        setModalActiv(false)

      } catch (error) {
        alert(error)

      }

    } else {
      try {
        console.log(data);
        const res = await api.addPasswordReset(data);
        setHaveToken(true)
      } catch (error) {
        alert(error)
      }
    }
  }

  return <div className={s.container}>
    <div className={s.close} onClick={() => setModalActiv(false)}>x</div>
    <h1>Восстановление пароля</h1>
    <div className={s.text}>Для получения временного пароля необходимо ввести email, указанный при регистрации. Вам придет код для сброса пароля.</div>
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {!haveToken && <>
        <input className={s.input} type="text" {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <span className={s.error}>Введите email</span>}
      </>}
      {haveToken && <>
        <input className={s.input} type="text" {...register("token", { required: true })} placeholder="Введите код с почты" />
        <input className={s.input} type={isShown ? "text" : "password"} {...register("password", { required: true, minLength: 6, pattern: /^[a-zA-Z0-9]+/ })} placeholder="Придумайте новый пароль" />
        {errors.email && <span className={s.error}>Введите email</span>}
        {errors.password && <span className={s.error}>Придумайте новый пароль</span>}
        {errors.password && <span className={s.error}> Не менее 6 символов</span>}
        {errors.password && <span className={s.error}>Пароль должен состоять из цифр и латинских букв верхнего и нижнего регистра</span>}
        <div className={s.eye__form__recovery} onClick={togglePassword}>
          {isShown ? <EveClose /> : <EveOpen />}
        </div>
      </>}
      <div className={s.text}>Срок действия временного пароля 24 ч.</div>



      <button className={s.btn} type="submit" onClick={() => { }}>Сбросить пароль</button>
    </form>

  </div>
}