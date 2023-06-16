import React from "react";
import { BtmBlack } from "../../components/BtmBlack/BtmBlack";
import s from "./index.module.css"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { uppdateAvatar, uppdateUser } from "../../storage/slice/userSlice";



export const DataUser = () => {
  const { register, handleSubmit } = useForm({});
  // const { register, handleSubmit, watch, formState: { errors } } = useForm({});

  const dispatch = useDispatch()
  const { name, about, avatar, _id } = useSelector(s => s.user.data)
  const { loading } = useSelector(s => s.user)
console.log(loading);

  const onSubmit = data => {
    dispatch(uppdateUser(data))
  }

  const changeAvatar = data => {
    console.log(data);
    dispatch(uppdateAvatar(data))
  }
  return <div className={s.wrapper}>

    {loading || !_id ? 'loading' :
      <>
        <BtmBlack />
        <h1 className={s.title}>Мои данные</h1>
        <div className={s.container}>
          <div >
            <img className={s.img} src={avatar} alt="ссылка на картинку" />
            <div >

              <form className={s.form} onSubmit={handleSubmit(changeAvatar)}>
                <label for="text">Ссылка на аватар</label>
                <input className={s.input} type="text" {...register("avatar")} placeholder="Имя" defaultValue={avatar} />
                <button className={s.btn} type="submit" >Изменить аватар</button>
              </form>
            </div>
          </div>
          <div>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <label for="name">Имя, фамалия</label>
              <input id="name" className={s.input} type="text" {...register("name")} placeholder="Имя" defaultValue={name} />
              <label for="avatar">О себе</label>
              <input id="avatar" className={s.input} type="text" {...register("about")} placeholder="О себе" defaultValue={about} />
              <button className={s.btn} type="submit" >Изменить данные</button>
            </form>
          </div>
        </div>
      </>
    }
  </div>
}