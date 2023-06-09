import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "./index.module.css"
import { ReactComponent as EveOpen } from "../img/eye-open.svg";
import { ReactComponent as EveClose } from "../img/eye-close.svg";
import { useContext } from "react";
import { CardsContext } from "../../context/context";
import { useNavigate } from "react-router";


export const Registration = () => {
  const [isShown, setIsSHown] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({});
  const { setModalActiv } = useContext(CardsContext)
  const navigate = useNavigate();

  const onSubmit = data => console.log(data);
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  }
  return <div className={s.container}>
    <div className={s.close} onClick={() => setModalActiv(false)}>x</div>
    <h1>Регистрация</h1>
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <input className={s.input} type="text" {...register("email", { required: true })} placeholder="Email" />

      <input className={s.input} type={isShown ? "text" : "password"} {...register("password", { required: true, minLength: 6, pattern: /^[A-Za-z]+$/i })} placeholder="Пароль" />
      {errors.email && <span className={s.error}>Введите email</span>}
      {errors.password && <span className={s.error}>Введите пароль</span>}
      {errors.password && <span className={s.error}> Не менее 6 символов</span>}
      {errors.password && <span className={s.error}>Только символы латинского алфавита</span>}


      <div className={s.text}>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</div>
      <button className={s.btn} type="submit" onClick={() => { }}>Зарегистрироваться</button>
      <button className={s.btn2} type="button" onClick={() => { navigate('/LoginAccount') }}>Войти</button>
      <div className={s.eye} onClick={togglePassword}>
        {isShown ? <EveClose /> : <EveOpen />}
      </div>
    </form>

  </div>
}