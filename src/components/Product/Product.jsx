import React, { useEffect } from "react";
import { discountNumber, sklonenie } from "../../utilities/utilities";
import { BtmBlack } from "../BtmBlack/BtmBlack";
import s from "./index.module.css"
import { ReactComponent as Medal } from "../Img/medal.svg";
import { ReactComponent as Like } from "../Img/like.svg";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { useForm } from "react-hook-form";
import { api } from "../../api/api";
import { useCallback } from "react";
import { Rating } from "../Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangeProducrLike, addCartProduct, deletCartProduct } from "../../storage/slice/productsSlice";
import { setModalActiv } from "../../storage/slice/modalSlice";
import { Delivery } from "../Delivery/Delivery";
import { Btm } from "../Btm/Btm";
import { setNotificatorActiv } from "../../storage/slice/notificatorSlice";
import { Notificator } from "../Notificator/Notificator";
import { ProductCounter } from "../ProductCounter/ProductCounter";

const options = { year: 'numeric', month: 'long', day: 'numeric' }

export const Product = ({ product }) => {
  const [isLike, setIsLike] = useState(false)
  const [productIdReview, setProductIdReview] = useState({})
  const [myReting, setMyReting] = useState(5)
  const { _id } = useSelector(s => s.user.data)
  const { modalActiv } = useSelector(s => s.modal)
  const { cartProduct } = useSelector(s => s.products)

  const dispath = useDispatch()


  const { register, handleSubmit, reset } = useForm({});



  const handleLike = useCallback(() => {
    dispath(fetchChangeProducrLike({ product, wasLike: isLike }))
    setIsLike(!isLike)
  }, [product, isLike, dispath])

  const onSubmit = useCallback(async ({ text }) => {
    try {
      const res = await api.addProductReviews(product._id, { text, rating: myReting })
      setProductIdReview(res.reviews)
      reset()
      dispath(setModalActiv(false))
      dispath(setNotificatorActiv({ NotificatorActiv: true, text: 'Ваш отзыва успешно добавлен' }))

    } catch (error) {
      dispath(setModalActiv(false))
      dispath(setNotificatorActiv({ NotificatorActiv: true, text: error.message }))
      reset()
    }
  }, [reset, product._id, dispath, myReting])

  const deletReviews = useCallback(async reviewId => {
    const res = await api.deleteProductReviews(product._id, reviewId)
    setProductIdReview(res.reviews)
  }, [product._id])

  const getAverage = (reviews) => {
    const sum = reviews.reduce((acc, el) => acc + el.rating, 0);
    const length = reviews.length;
    return Math.floor(sum / length)
  };

  const cartProductThis = cartProduct?.find((e) => e._id === product._id)

  const addToBasket = useCallback(() => {
    dispath(addCartProduct(product))
    if (cartProduct.some((e) => e._id === product._id)) {
      dispath(setNotificatorActiv({ NotificatorActiv: true, text: 'Товар уже добавлен в корзину' }))
    } else {
      dispath(setNotificatorActiv({ NotificatorActiv: true, text: 'Добавлено в корзину' }))
    }
  }, [dispath, cartProduct, product])

  useEffect(() => {
    if (cartProductThis?.stock === 0) {
      return
    } else if (cartProductThis && cartProductThis?.countProduct === 0) {
      dispath(deletCartProduct(cartProductThis._id))
      dispath(setNotificatorActiv({ NotificatorActiv: true, text: 'Удалено из корзины' }))

    }
  }, [dispath, cartProductThis])



  useEffect(() => {
    const Like = product.likes.some((el) => el === _id)
    setIsLike(Like)
  }, [_id, product.likes])

  useEffect(() => {
    api.getProductIdAll(product._id)
      .then((data) => setProductIdReview(data))
      .catch(() => console.log('Ошибка'))
  }, [product._id])


  return (<div className={s.product}>
    <div className={s.titleWrapper}>

      <BtmBlack />
      <Notificator />
      <span className={s.productTitle}>{product.name}</span>
      {!!Object.keys(productIdReview).length &&
        <div className={s.rating}>
          <Rating rating={getAverage(productIdReview)} />
          <span>{productIdReview.length} {sklonenie(productIdReview.length, ['отзыв', 'отзыва', 'отзывов'])}</span>
        </div>}
    </div>
    <div className={s.imgWrapper}>
      <img className={s.Img} src={product.pictures} alt="Ссылка на картинку" />
      <div className={s.container__left}>
        <div className={s.desc}>
          <span className={`${s.price}   ${!!product.discount && s.oldPrice}`}>{product.price}р</span>
          {!!product.discount &&
            <span className={`${s.price}   ${!!product.discount && s.newPrice}`}>{discountNumber(product.price, product.discount)}р</span>}
        </div >
        <div className={s.controls}>
          {cartProductThis || cartProductThis?.stock === 0 ?
            <ProductCounter product={cartProductThis} />
            :
            <Btm backgroundColor='#FFE44D' onClick={addToBasket}>В корзину</Btm>
          }
        </div>
        <button className={isLike ? s.Like : s.noLike} onClick={() => handleLike()}>
          <Like />
          <span className={s.text__favorites}>{isLike ? 'В избранном' : 'В избранное'}</span>
        </button>
        <Delivery />
        <div className={s.delivery}>
          <Medal />
          <div >
            <span className={s.text__header}>Гарантия качества </span>
            <p className={s.text}>Если Вам не понравилось качество нашей <br />продукции, мы вернем деньги,<br /> либо сделаем все возможное, чтобы <br />удовлетворить ваши нужды.</p>
          </div>
        </div>
      </div>
    </div>
    <div className={s.desc}>
      <span className={s.price}>Описание</span>
      <span>{product.description}</span>
    </div>
    <div className={s.reviews}>
      <span className={s.price}>Отзывы</span>
      <button className={s.btn__review} onClick={() => { dispath(setModalActiv(true)) }}>Написать отзыв</button>

      {<Modal>
        {modalActiv && <div className={s.container__form}>
          <div className={s.close} onClick={() => dispath(setModalActiv(false))}>x</div>
          <h1>Ваш отзыв</h1>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Rating rating={myReting} setMyReting={setMyReting} isEditable={true} />
            <textarea className={s.input} type="text" {...register("text", { required: true })} placeholder="Напешите отзыв" />
            <button className={s.btn__review} type="submit" onClick={() => { }}>Отправить отзыв</button>
          </form>
        </div>}
      </Modal>}
      {!!Object.keys(productIdReview).length &&
        productIdReview
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .map((e) => <div className={s.reviews} key={e._id}>
            <div className={s.separator} />
            <div className={s.reviews__user}>
              <img className={s.img__user} src={e.author.avatar} alt='Аватар' />
              <span className={s.name}>{e.author.name}</span>

              <span className={s.text__favorites}>{new Date(e.created_at).toLocaleDateString('ru-RU', options)}</span>
              {_id === e.author._id &&
                <button className={s.btn__review} onClick={() => { deletReviews(e._id) }}>Удалить Ваш отзыв</button>}
            </div>
            <Rating rating={e.rating} />
            <div>{e.text}</div>
          </div>)
      }

    </div>
  </div>)
}