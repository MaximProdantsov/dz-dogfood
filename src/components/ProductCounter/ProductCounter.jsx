import React from "react";
import { useDispatch } from "react-redux";
import { setCountMinus, setCountPlus } from "../../storage/slice/productsSlice";
import s from './index.module.css'

export const ProductCounter = ({ product }) => {
  const dispath = useDispatch()

  return <>
    <div className={s.controls__card}>
      {product?.stock === 0 ?
        <span className={s.text}> Товара нет на складе</span>
        :
        <>
          <span onClick={() => { dispath(setCountMinus(product._id)) }} className={s.controls__cart__plus__minus}>-</span>
          <span className={s.controls__cart__num}>{product?.countProduct}</span>
          <span onClick={() => { dispath(setCountPlus(product._id)) }} className={s.controls__cart__plus__minus}>+</span>
        </>
      }
    </div>
  </>
}