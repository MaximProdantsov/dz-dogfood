import React from "react";
import "./index.css"

export const Search = (props) => {
  return <input className="search" onChange={(e)=>props.setSearch(e.target.value)}
   placeholder="Поиск товара..."></input>
}