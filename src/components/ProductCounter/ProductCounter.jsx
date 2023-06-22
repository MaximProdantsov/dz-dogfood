import React from "react";
import { useDispatch } from "react-redux";
import { setCountMinus, setCountPlus } from "../../storage/slice/productsSlice";
import s from './index.module.css'

export const ProductCounter = ({product}) => {
  const dispath = useDispatch()

  return <div className={s.controls__card}>
    <span onClick={() => {dispath(setCountMinus(product))}} className={s.controls__cart__plus__minus}>-</span>
    <span className={s.controls__cart__num}>{product.countProduct}</span>
    <span onClick={() => {dispath(setCountPlus(product))}} className={s.controls__cart__plus__minus}>+</span>
  </div>
}