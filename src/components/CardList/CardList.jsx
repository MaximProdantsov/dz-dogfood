import React from "react";
import { Cards } from "../Cards/Cards";
import "./index.css"


export const CardList = ({cards}) => {
 
  return <section className="cardList">
   {cards.map((el)=>{
    return <Cards product = {el} key={el._id}  />
   })}
  </section>
}