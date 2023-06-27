import React from "react";
import { Cards } from "../Cards/Cards";
import { Notificator } from "../Notificator/Notificator";
import "./index.css"


export const CardList = ({ products }) => {

  return <>
    <Notificator />
    <section className="cardList">
      {products.map((el) => {
        return <Cards product={el} key={el._id} />
      })}
    </section>
  </>
}