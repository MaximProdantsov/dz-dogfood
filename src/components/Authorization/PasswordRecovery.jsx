import React from "react";
import { useForm } from "react-hook-form";
import s from "./index.module.css"
import { useContext } from "react";
import { CardsContext } from "../../context/context";


export const PasswordRecovery = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({});
  const { setModalActiv } = useContext(CardsContext)


  const onSubmit = data => console.log(data);

  return <div className={s.container}>
    <div className={s.close} onClick={() => setModalActiv(false)}>x</div>
    <h1>Восстановление пароля</h1>
    <div className={s.text}>Для получения временного пароля необходимо ввести email, указанный при регистрации.</div>
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <input className={s.input} type="text" {...register("email", { required: true })} placeholder="Email" />


      {errors.email && <span className={s.error}>Введите email</span>}
      <div className={s.text}>Срок действия временного пароля 24 ч.</div>



      <button className={s.btn} type="submit" onClick={() => { }}>Войти</button>
    </form>

  </div>
}