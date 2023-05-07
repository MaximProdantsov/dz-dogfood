import React from "react";
import "./index.css"
import { ReactComponent as Logo } from "../img/logo.svg"
import { Search } from "../Search/Search";
import { useLocation } from "react-router";

export const Header = (props) => {

  const setSearchQuery = (query) => {
    props.setSearch(query)
  }

  const location = useLocation()

  return <header className='header' >
    <div className="header__wrapper">
      <Logo />
      {location.pathname === "/" && <Search setSearch={setSearchQuery} />}
    </div>
  </header>
}