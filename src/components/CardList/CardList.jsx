import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificatorActiv } from "../../storage/slice/notificatorSlice";
import { setCartProduct } from "../../storage/slice/productsSlice";
import { Cards } from "../Cards/Cards";
import { Notificator } from "../Notificator/Notificator";
import "./index.css"


export const CardList = ({ products }) => {
  const { cartProduct } = useSelector(s => s.products)
  const dispatch = useDispatch()

  const addToBasket = useCallback(() => {
    dispatch(setCartProduct(products))
    if (cartProduct.some((e) => e._id === products._id)) {
      dispatch(setNotificatorActiv({ NotificatorActiv: true, text: 'Товар уже добавлен в корзину' }))
    } else {
      dispatch(setNotificatorActiv({ NotificatorActiv: true, text: 'Добавлено в корзину' }))
    }
  }, [dispatch, cartProduct, products])

  return <>
    <Notificator />
    <section className="cardList">
      {products.map((el) => {
        return <Cards addToBasket={addToBasket} product={el} key={el._id} />
      })}
    </section>
  </>
}