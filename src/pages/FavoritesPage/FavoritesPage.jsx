import React from "react";
import { useSelector } from "react-redux";
import { BtmBlack } from "../../components/BtmBlack/BtmBlack";
import { CardList } from "../../components/CardList/CardList";
import s from "./index.module.css"

export const FavoritesPage = () => {
const {favoriteCards} = useSelector (s=>s.products)

  return <div className={s.favoritesPage}>
    <BtmBlack />
    <h1 className={s.title}>Избранное</h1>
    <CardList products={favoriteCards}  />
  </div>
}

