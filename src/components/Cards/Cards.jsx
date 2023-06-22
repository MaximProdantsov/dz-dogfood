import React from "react";
import "./index.css"
import { ReactComponent as Like } from "../img/like.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangeProducrLike, setCartProduct } from "../../storage/slice/productsSlice";
import { BtmYellow } from "../BtmYellow/BtmYellow";
import { setNotificatorActiv } from "../../storage/slice/notificatorSlice";
import { useCallback } from "react";



export const Cards = ({ product }) => {
  const { _id } = useSelector(s => s.user.data)
  const { cartProduct } = useSelector(s => s.products)
  const dispatch = useDispatch()

  const isLike = product.likes.some((el) => el === _id)
  const pressLike = () => {
    dispatch(fetchChangeProducrLike({ product, wasLike: isLike }))
  }

  const addToBasket = useCallback(() => {
    dispatch(setCartProduct(product))
    if (cartProduct.some((e) => e._id === product._id)) {
      dispatch(setNotificatorActiv({ NotificatorActiv: true, text: 'Товар уже добавлен в корзину' }))

    } else {

      dispatch(setNotificatorActiv({ NotificatorActiv: true, text: 'Добавлено в корзину' }))
    }
  },[dispatch, cartProduct, product])

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
      <BtmYellow onClick={addToBasket}>В корзину</BtmYellow>
    </div>
  </>
}