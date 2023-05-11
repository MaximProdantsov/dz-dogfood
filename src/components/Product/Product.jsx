import React from "react";
import { BtmBlack } from "../BtmBlack/BtmBlack";
import s from "./index.module.css"

export const Product = ({ product }) => {


  return (<div className={s.product}>
    <div className={s.titleWrapper}>

      <BtmBlack />

      <span className={s.productTitle}>{product.name}</span>
      <div className={s.rating}>
        <span>Artikul</span>
        <span>Rate</span>
      </div>
    </div>
    <div className={s.imgWrapper}>
      <img className={s.img} src={product.pictures} alt="Ссылка на картинку" />

    </div>

    <div className={s.desc}>
      <span className={s.price}>{product.price} р</span>
    </div>
    <div className={s.desc}>


      <span className={s.price}>Описание</span>

      <span>{product.description}</span>
    </div>
  </div>)
}