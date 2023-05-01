import React from "react";
import "./index.css"
import { ReactComponent as Like } from "../img/like.svg";

export const Cards = ({product}) => {

  return <div className="cards">
    <div className="stick">
      {!! product.discount &&  <div className="stic__left__promotion card__discount">-{product.discount}</div>}
      <div className="stick__right"><Like/></div>
    </div>
    <a href="/" className='card__link'>
                <img src={product.pictures} alt="food" className='card__image__product' />
                <div className='card__desc'>
                    <span className='card__price'>{product.price}p</span>
                    <span className='card__weight'>80</span>
                </div>
                <p className='card__name'>{product.name}</p>
            </a>
            <span className='card__card btn btn_type_primary'>В Корзину</span>
  </div>
}