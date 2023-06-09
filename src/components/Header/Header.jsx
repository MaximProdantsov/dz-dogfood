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
  const { favoriteCards, setModalActiv } = useContext(CardsContext)




  const location = useLocation()

  return <header className='header' >
    <div className="header__wrapper">
      <Link to='/'>
        <Logo />
      </Link>
      <Link to='/profile/data'>
        <button>profile</button>
      </Link>
      {location.pathname === "/" && <Search />}
      <div className="icons">
        <div className="favorites__icons">
          <Link to="/favorites">
            <Favorites />
            {!!favoriteCards.length && <span className="babl">{favoriteCards.length}</span>}
          </Link>
        </div>
        <Suitcase />
        <Link to={'/registration'} onClick={() => setModalActiv(true)}>
        <Dog ></Dog>
        </Link>


      </div>
    </div>
  </header>
}