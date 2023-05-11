import React from "react";
import { useContext } from "react";
import { BtmBlack } from "../../components/BtmBlack/BtmBlack";
import { CardList } from "../../components/CardList/CardList";
import { CardsContext } from "../../context/context";
import s from "./index.module.css"

export const FavoritesPage = () => {
const {favoriteCards} = useContext (CardsContext)

  return <div className={s.favoritesPage}>
    <BtmBlack />
    <h1 className={s.title}>Избранное</h1>
    <CardList cards={favoriteCards}  />
  </div>
}
