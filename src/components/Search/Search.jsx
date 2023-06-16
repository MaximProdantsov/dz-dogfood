import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDelay } from "../../hooks/hooks";
import { fetchProductSearch } from "../../storage/slice/productsSlice";
import { setSearch } from "../../storage/slice/searchSlice";
import "./index.css"

export const Search = () => {
  const dispatch = useDispatch()
  const {search} = useSelector(s=>s.search)
  const delayValueApp = useDelay(search)
  useEffect(() => {
    if (delayValueApp === undefined) return;
    dispatch(fetchProductSearch(delayValueApp))
  }, [delayValueApp, dispatch])
  return <input className="search" onChange={(e) => dispatch(setSearch(e.target.value))}
    placeholder="Поиск товара..."></input>
}