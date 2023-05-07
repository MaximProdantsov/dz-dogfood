
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { api } from './api/api';

import './App.css';
// import { CardList } from './components/CardList/CardList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { NotFound } from './components/NotFound/NotFound';
import { useDelay } from './hooks/hooks';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
// import data from "./data/data.json"

function App() {
  const [search, setSearch] = useState(undefined)
  const [cards, setСards] = useState([])
  const [user, setUser] = useState({})

  const delayValueApp = useDelay(search)

  const handleProductLike = (product, isLike) => {
    (isLike ? api.deleteLike(product._id) : api.addLike(product._id))
      .then((uppdateCards) => {
        const newCards = cards.map((e) => e._id === uppdateCards._id ? uppdateCards : e)
        setСards(newCards)
      })
  }

  const getAverage = (reviews) => {
    const sum = reviews.reduce((acc, el) => acc + el.rating, 0);
    const length = reviews.length;
    return sum / length;
  };


  const onSort = (sortId) => {
    console.log(sortId);
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
        const sortCardNew = cards.filter((el) => el.tags.includes('new'))
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
    api.getProductList().then((res) => setСards(res.products))
    api.getUserMe().then((res) => setUser(res))
  }, [])

  return <div>
    <Header setSearch={setSearch} />
    <Routes>
      <Route path='/' element={<CatalogPage cards={cards} user={user} handleProductLike={handleProductLike} search={search} onSort={onSort} />} />
      <Route path='product/:id' element={<ProductPage />} />
      <Route path='*' element={<NotFound/>} />

    </Routes>

    <Footer />
  </div>

}

export default App;
