import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './index.module.css'
import cn from "classnames";
import { discountNumber, sklonenie } from "../../utilities/utilities";
import { BtmBlack } from "../../components/BtmBlack/BtmBlack";
import { ReactComponent as Trash } from "../../components/Img/ic-trash.svg";
import { deletCartProduct } from "../../storage/slice/productsSlice";
import { ProductCounter } from "../../components/ProductCounter/ProductCounter";
import { Delivery } from "../../components/Delivery/Delivery";
import { Notificator } from "../../components/Notificator/Notificator";
import { useEffect } from "react";
import { setNotificatorActiv } from "../../storage/slice/notificatorSlice";



export const CartProductPage = () => {
  const { cartProduct } = useSelector(s => s.products)
  const dispatch = useDispatch()
  const costProducts = cartProduct.reduce((accum, el) =>
    accum + el.countProduct * el.price, 0)
  const totalDiscount = costProducts - cartProduct.reduce((accum, e) =>
    accum + e.countProduct * discountNumber(e.price, e.discount), 0)
  const totalCost = costProducts - totalDiscount
  const generalCountProduct = cartProduct.reduce((accum, el) =>
    accum + el.countProduct, 0
  )
  useEffect(() => {
    if (cartProduct.some((e) => e.stock === e.countProduct && e.stock !== 0)) {
      dispatch(setNotificatorActiv({ NotificatorActiv: true, text: 'Максимальное количество' }))
    }
  }, [dispatch, cartProduct])

  return <>
    <Notificator />
    <div className={s.wrapper}>
      <BtmBlack />
      <div className={s.text__title}>
        <b>{cartProduct.length} {sklonenie(cartProduct.length, ['товар', 'товара', 'товаров'])} </b> в корзине
      </div>
      <div className={s.container}>
        <div>
          {cartProduct.map((e) => <div className={s.container__left} key={e._id}>
            <img className={s.Img} src={e.pictures} alt='Картинка' />
            <div className={s.cont__text__name}>
              <div className={s.text__name}>
                {e.name}
              </div>
              <div className={s.text__wight}>
                {e.wight}
              </div>
            </div>
            <ProductCounter product={e} />
            {e.stock > 0 &&
              <div>
                <div className={cn(s.price, { [s.oldPrice]: e.discount })}>{e.price * e.countProduct} p.</div>
                {!!e.discount && <div className={s.newPrice}> {discountNumber(e.price, e.discount) * e.countProduct} р.</div>}
              </div>}
            <Trash className={s.icons} onClick={() => { dispatch(deletCartProduct(e._id)) }} />
          </div>)}
        </div>
        <div>
          <div className={s.container__righr}>
            <b className={s.text__title}> Ваша корзина </b>
            <div className={s.align}>
              <span className={s.text__wight}>Товары ({generalCountProduct})</span> <span>{costProducts}p</span>
            </div>
            <div className={s.align}>
              <span className={s.text__wight}>скидка:</span> <span className={s.newPrice}>-{totalDiscount}</span>
            </div>
            <div className={s.align}>
              <b >Общая стоимость:</b> <span className={s.price}>{totalCost}р</span>
            </div>
          </div>
          <Delivery />

        </div>
      </div>
    </div>
  </>
}

