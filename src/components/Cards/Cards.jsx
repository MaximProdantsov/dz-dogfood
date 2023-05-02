import React from "react";
import "./index.css"
import { ReactComponent as Like } from "../img/like.svg";
// import { api } from "../../api/api";


export const Cards = ({ product, userId, handleProductLike }) => {

  const isLike = product.likes.some((el) => el === userId)

  const pressLike = () => {
    handleProductLike(product, isLike)
  }


  return <div className="cards">
    <div className="stick">
      {!!product.discount && <span className="stic__left__promotion card__discount">-{product.discount}%</span>}
      {product.tags.map(el => <span className={`stick__${el}`} key={el}>{el}</span>)}
      {isLike ? <button onClick={pressLike} className="stick__right__btn__Like" ><Like /></button>
        : <button onClick={pressLike} className="stick__right__btn__noLike" ><Like /></button>}


    </div>
    <a href="/" className='card__link'>
      <img src={product.pictures} alt="food" className='card__image__product' />
      <div className='card__desc'>
        <span className='card__price'>{product.price}p</span>
        <span className='card__weight'>{product.wight}</span>
      </div>
      <p className='card__name'>{product.name}</p>
    </a>
    <span className='card__card btn btn_type_primary'>В Корзину</span>
  </div>
}