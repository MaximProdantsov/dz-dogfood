import React from "react";
import "./index.css"
import { ReactComponent as Like } from "../Img/like.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangeProducrLike, addCartProduct, deletCartProduct } from "../../storage/slice/productsSlice";
import { Btm } from "../Btm/Btm";
import { setNotificatorActiv } from "../../storage/slice/notificatorSlice";
import { useCallback } from "react";
import { ProductCounter } from "../ProductCounter/ProductCounter";
import { useEffect } from "react";

export const Cards = ({ product }) => {
  const { _id } = useSelector(s => s.user.data)
  const { cartProduct } = useSelector(s => s.products)
  const dispatch = useDispatch()
  const isLike = product.likes.some((el) => el === _id)
  const pressLike = () => {
    dispatch(fetchChangeProducrLike({ product, wasLike: isLike }))
  }
 
  const cartProductThis = cartProduct?.find((e) => e._id === product._id)
  console.log(cartProductThis);


  const addToBasket = useCallback(() => {
    if (cartProduct?.some((e) => e._id === product._id)) {
      dispatch(setNotificatorActiv({ NotificatorActiv: true, text: 'Товар уже добавлен в корзину' }))
    } else {
      dispatch(addCartProduct(product))
      dispatch(setNotificatorActiv({ NotificatorActiv: true, text: 'Добавлено в корзину' }))
    }
  }, [cartProduct, dispatch, product])

  useEffect(() => {
    if (cartProductThis?.stock === 0) {
      return
    } else if (cartProductThis && cartProductThis?.countProduct === 0) {
      dispatch(deletCartProduct(cartProductThis._id))
      dispatch(setNotificatorActiv({ NotificatorActiv: true, text: 'Удалено из корзины' }))

    }
  }, [dispatch, cartProductThis])


  return <>
    <div className="cards">
      <div className="stick">
        {!!product.discount && <span className="stic__left__promotion card__discount">-{product.discount}%</span>}
        {product.tags.map(el => <span className={`stick__${el}`} key={el}>{el}</span>)}
        {isLike ? <button onClick={pressLike} className="stick__right__btn__Like" ><Like /></button>
          : <button onClick={pressLike} className="stick__right__btn__noLike" ><Like /></button>}
      </div>
      <Link to={`/product/${product._id}`} className='card__link'>
        <img src={product.pictures} alt="food" className='card__image__product' />
        <div className='card__desc'>
          <span className='card__price'>{product.price} p</span>
          <span className='card__weight'>{product.wight}</span>
        </div>
        <p className='card__name'>{product.name}</p>
      </Link>
      {cartProductThis || cartProductThis?.stock === 0 ?
        <ProductCounter product={cartProductThis} />
        :
        <Btm backgroundColor='#FFE44D' onClick={addToBasket}>В корзину</Btm>
      }
    </div>
  </>
}