import React from "react";
import { useContext } from "react";
import { CardList } from "../../components/CardList/CardList";
import { NotFound } from "../../components/NotFound/NotFound";
import { CardsContext } from "../../context/context";
import { sklonenie } from "../../utilities/utilities";
import s from './index.module.css'

export const CatalogPage = () => {
  const { cards, search, onSort, setSearch } = useContext(CardsContext)
  

  const sortItem = [{ id: 'popular', title: 'Популярные' }, { id: 'new', title: 'Новинки' }, { id: 'cheap', title: 'Сначала дешевые' }, { id: 'expensive', title: 'Сначала дорогие' }, { id: 'rating', title: 'По рейтингу' }, { id: 'discount', title: 'По скидке' }]

  return (
    <>
      <div className={s.catalogPage}>
        {search && <p className={s.search}>По запросу <b>{search}</b> {cards.length === 1 ? 'найден' : 'найдено'} {cards.length} {sklonenie(cards.length, ['товар', 'товара', 'товаров'])}</p>}
        {cards.length > 0 && <div className={s.sort}>
          {sortItem.map((el) => {
            return <span className={s.sortItem} key={el.id} onClick={() => onSort(el.id)}>{el.title}</span>
          })}
        </div>}
        {cards.length === 0 ? <NotFound setSearch={setSearch}/> : <CardList cards={cards}  />}
      </div>
    </>
  )
}