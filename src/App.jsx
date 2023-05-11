
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { api } from './api/api';

import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { NotFound } from './components/NotFound/NotFound';
import { CardsContext, UserContext } from './context/context';
import { useDelay } from './hooks/hooks';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
// import data from "./data/data.json"

function App() {
  const [search, setSearch] = useState(undefined)
  const [cards, setСards] = useState([])
  const [user, setUser] = useState({})
  const [favoriteCards, setFavoriteCards] = useState([])


  const delayValueApp = useDelay(search)

  const handleProductLike = (product, wasLike) => {
    (wasLike ? api.deleteLike(product._id) : api.addLike(product._id))
      .then((uppdateCards) => {
        const newCards = cards.map((e) => e._id === uppdateCards._id ? uppdateCards : e)
        setСards(newCards)
        wasLike ?
          setFavoriteCards((state) => state.filter((el) => el._id !== uppdateCards._id))
          :
          setFavoriteCards((state) => [uppdateCards, ...state])
      })
  }

  const getAverage = (reviews) => {
    const sum = reviews.reduce((acc, el) => acc + el.rating, 0);
    const length = reviews.length;
    return sum / length;
  };


  const onSort = (sortId) => {
    switch (sortId) {
      case 'cheap':
        const sortCardCheap = cards.sort((a, b) => a.price - b.price)
        setСards([...sortCardCheap])
        break;
      case 'expensive':
        const sortCardExpensive = cards.sort((a, b) => b.price - a.price)
        setСards([...sortCardExpensive])
        break;
      case 'new':
        const sortCardNew = cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setСards([...sortCardNew])
        break;
      case 'discount':
        const sortCardDiscount = cards.filter((el) => el.tags.includes('sale'))
        setСards([...sortCardDiscount])
        break;
      case 'popular':
        const sortCardPopular = cards.sort((a, b) => b.likes.length - a.likes.length)
        setСards([...sortCardPopular])
        break;
      case 'rating':
        const sortCardRating = cards.sort((a, b) =>
          getAverage(b.reviews) - getAverage(a.reviews))
        setСards([...sortCardRating])
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (delayValueApp === undefined) return;
    api.searchProduct(delayValueApp).then((res) => setСards(res))
  }, [delayValueApp])

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserMe()]).then(([data, userId]) => {
      setСards(data.products)
      setUser(userId)
      const cardsLikes = data.products.filter((e) => e.likes.includes(userId._id))
      setFavoriteCards(cardsLikes)
    })
  }, [])


  return <div>
    <CardsContext.Provider value={{ cards, handleProductLike, search, onSort, setSearch, favoriteCards }}>
      <UserContext.Provider value={user}>
        <Header setSearch={setSearch} favoriteCards={favoriteCards} />
        <Routes>
          <Route path='/' element={<CatalogPage />} />
          <Route path='product/:id' element={<ProductPage />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/favorites' element={<FavoritesPage />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </CardsContext.Provider>
  </div>

}

export default App;
