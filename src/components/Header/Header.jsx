import React from "react";
import "./index.css"
import { ReactComponent as Logo } from "../img/logo.svg"
import { Search } from "../Search/Search";

export const Header = (props) => {

  const setSearchQuery = (query) => {
    props.setSearch(query)
  }


  return <header className='header' >
    <div className="header__wrapper">
      <Logo />
      <Search setSearch={setSearchQuery} />
    </div>
  </header>
}