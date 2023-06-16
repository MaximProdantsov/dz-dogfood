import React from "react";
import { Cards } from "../Cards/Cards";
import "./index.css"


export const CardList = ({products}) => {
 
  return <section className="cardList">
   {products.map((el)=>{
    return <Cards product = {el} key={el._id}  />
   })}
  </section>
}