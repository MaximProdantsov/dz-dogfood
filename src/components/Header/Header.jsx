import "./index.css"
import { ReactComponent as Logo } from "../img/logo.svg"
import { Search } from "../Search/Search";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as Favorites } from "../img/favorites.svg";
import { ReactComponent as Suitcase } from "../img/suitcase.svg";
import { ReactComponent as Dog } from "../img/dog.svg";
import { ReactComponent as LogoEntrance } from "../img/logo-entrance.svg";
import { useDispatch, useSelector } from "react-redux";
import { setModalActiv } from "../../storage/slice/modalSlice";


export const Header = () => {
  const { isAuthorization } = useSelector(s => s.user)
  const { favoriteCards, cartProduct } = useSelector(s => s.products)
  const location = useLocation()
  const dispath = useDispatch()

  const SignOut = () =>{
    localStorage.removeItem('token')
    dispath(setModalActiv(true))
  }

  return <header className='header' >
    <div className="header__wrapper">
      <Link to='/'>
        <Logo />
      </Link>
      {location.pathname === "/" && <Search />}
      <div className="icons">
        <div className="favorites__icons">
          <Link to="/favorites">
            <Favorites />
            {!!favoriteCards.length && <span className="babl">{favoriteCards.length}</span>}
          </Link>
        </div>
        <div className="favorites__icons">
          <Link to="/cart">
            <Suitcase />
            {!!cartProduct.length && <span className="babl">{cartProduct.length}</span>}
          </Link>
        </div>
        <Link to='/profile/data'>
          <Dog />
        </Link>
        {isAuthorization ? <Link to={'/LoginAccount'}> <LogoEntrance onClick={SignOut} /></Link>  : <Link to={'/registration'} onClick={() => dispath(setModalActiv(true))}>
          <LogoEntrance />
        </Link>}
      </div>
    </div>
  </header>
}