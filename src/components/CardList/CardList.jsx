import React from "react";
import { Cards } from "../Cards/Cards";
import "./index.css"


export const CardList = ({cards, userId, handleProductLike}) => {
 
  return <section className="cardList">
   {cards.map((el)=>{
    return <Cards product = {el} key={el._id} userId={userId} handleProductLike={handleProductLike}/>
   })}
  </section>
}