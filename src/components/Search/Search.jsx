import React from "react";
import { useContext } from "react";
import { CardsContext } from "../../context/context";
import "./index.css"

export const Search = () => {
  const { setSearch } = useContext(CardsContext)
  return <input className="search" onChange={(e) => setSearch(e.target.value)}
    placeholder="Поиск товара..."></input>
}