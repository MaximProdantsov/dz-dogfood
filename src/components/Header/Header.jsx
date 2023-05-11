import React from "react";
import "./index.css"
import { ReactComponent as Logo } from "../img/logo.svg"
import { Search } from "../Search/Search";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as Favorites } from "../img/favorites.svg";
import { ReactComponent as Suitcase } from "../img/suitcase.svg";
import { ReactComponent as Dog } from "../img/dog.svg";
import { useContext } from "react";
import { CardsContext } from "../../context/context";


export const Header = () => {
  const {setSearch, favoriteCards} = useContext(CardsContext) 

  const setSearchQuery = (query) => {
    setSearch(query)
  }

  const location = useLocation()

  return <header className='header' >
    <div className="header__wrapper">
      <Link to='/'>
        <Logo />
      </Link>
      {location.pathname === "/" && <Search setSearch={setSearchQuery} />}
      <div className="icons">
        <div className="favorites__icons">
          <Link to="/favorites">
            <Favorites />
            {!! favoriteCards.length && <span className="babl">{favoriteCards.length}</span>}
          </Link>
        </div>
        <Suitcase />
        <Dog />
      </div>
    </div>
  </header>
}