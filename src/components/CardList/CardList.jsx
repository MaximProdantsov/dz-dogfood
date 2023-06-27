import React from "react";
import { useSelector } from "react-redux";
import { Cards } from "../Cards/Cards";
import { Notificator } from "../Notificator/Notificator";
import { Pagination } from "../Pagination/Pagination";
import "./index.css"


export const CardList = ({ products }) => {

  const { currentPage, perPage } = useSelector(s => s.pagination)
  const lastProductIndex = currentPage * perPage;
  const firstProductIndex = lastProductIndex - perPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);
  

  return <>
    <Notificator />
    {<Pagination />}
    <section className="cardList">
      {currentProducts.map((el) => {
        return <Cards product={el} key={el._id} />
      })}
    </section>
    {<Pagination />}
  </>
}