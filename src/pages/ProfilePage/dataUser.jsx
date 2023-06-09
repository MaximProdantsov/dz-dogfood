import React from "react";
import { BtmBlack } from "../../components/BtmBlack/BtmBlack";
import s from "./index.module.css"
import { useForm } from 'react-hook-form'



export const DataUser = () => {
  const { register, handleSubmit } = useForm({});
  // const { register, handleSubmit, watch, formState: { errors } } = useForm({});

  const onSubmit = data => console.log(data);




  return <div className={s.container}>
    <BtmBlack />
    <h1 className={s.title}>Мои данные</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name") } placeholder="Имя" />
      <input type="text" {...register("lastName")} placeholder="Фамилия" />
      <input type="tel" {...register("telephone")} placeholder='Телефон' />
      <input type="text" {...register("email")} placeholder='Почта' />
      <button type="submit" onClick={() => { }}>Сохранить</button>
    </form>
  </div>
}