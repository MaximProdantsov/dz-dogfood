import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardList } from "../../components/CardList/CardList";
import { NotFound } from "../../components/NotFound/NotFound";
import { sortProducts } from "../../storage/slice/productsSlice";
import { sklonenie } from "../../utilities/utilities";
import s from './index.module.css'
import { Pagination } from "../../components/Pagination/Pagination";



export const CatalogPage = () => {
  const { search } = useSelector(s => s.search)
  const { products } = useSelector(s => s.products)
  const dispath = useDispatch()
  const { currentPage, perPage } = useSelector(s => s.pagination)
  const lastProductIndex = currentPage * perPage;
  const firstProductIndex = lastProductIndex - perPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  const sortItem = [{ id: 'popular', title: 'Популярные' }, { id: 'new', title: 'Новинки' }, { id: 'cheap', title: 'Сначала дешевые' }, { id: 'expensive', title: 'Сначала дорогие' }, { id: 'rating', title: 'По рейтингу' }, { id: 'discount', title: 'По скидке' }]

  return (
    <>
      <div className={s.catalogPage}>
        {search && <p className={s.search}>По запросу <b>{search}</b> {products.length === 1 ? 'найден' : 'найдено'} {products.length} {sklonenie(products.length, ['товар', 'товара', 'товаров'])}</p>}
        {products.length > 0 && <div className={s.sort}>
          {sortItem.map((el) => {
            return <span className={s.sortItem} key={el.id} onClick={() => dispath(sortProducts(el.id))}>{el.title}</span>
          })}
        </div>}
        {products.length === 0 ? <NotFound /> :
          <>
            <Pagination />
            <CardList products={currentProducts} />
            <Pagination />
          </>}
      </div>

    </>
  )
}