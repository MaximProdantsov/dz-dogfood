import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "./index.module.css"
import { ReactComponent as EveOpen } from "../Img/eye-open.svg";
import { ReactComponent as EveClose } from "../Img/eye-close.svg";
import { useNavigate } from "react-router";
import { api } from "../../api/api";
import { useDispatch } from "react-redux";
import { setModalActiv } from "../../storage/slice/modalSlice";


export const Registration = () => {
  const [isShown, setIsSHown] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({});
  const navigate = useNavigate();
  const dispath = useDispatch()


  const onSubmit = async (data) => {
    try {
      await api.addUserRegistration({...data, group: "group-12"});
      dispath(setModalActiv(false))
    } catch (error) {
      alert(error)
    }
  }

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  }
  return <div className={s.container}>
    <div className={s.close} onClick={() => dispath(setModalActiv(false))}>x</div>
    <h1>Регистрация</h1>
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <input className={s.input} type="text" {...register("email", { required: true })} placeholder="Email" />

      <input className={s.input} type={isShown ? "text" : "password"} {...register("password", { required: true, minLength: 6, pattern: /^[a-zA-Z0-9]+/ })} placeholder="Пароль" />
      {errors.email && <span className={s.error}>Введите email</span>}
      {errors.password && <span className={s.error}>Введите пароль</span>}
      {errors.password && <span className={s.error}> Не менее 6 символов</span>}
      {errors.password && <span className={s.error}>Пароль должен состоять из цифр и латинских букв верхнего и нижнего регистра</span>}


      <div className={s.text}>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</div>
      <button className={s.btn} type="submit" onClick={() => { }}>Зарегистрироваться</button>
      <button className={s.btn2} type="button" onClick={() => { navigate('/login') }}>Войти</button>
      <div className={s.eye} onClick={togglePassword}>
        {isShown ? <EveClose /> : <EveOpen />}
      </div>
    </form>

  </div>
}