
import React, { useEffect, useState } from 'react';
import { api } from './api/api';

import './App.css';
import { CardList } from './components/CardList/CardList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { useDelay } from './hooks/hooks';
// import data from "./data/data.json"




function App() {
  const [search, setSearch] = useState(undefined)
  const [cards, setСards] = useState([])
  // const [user, setUser] = useState({})


const delayValueApp = useDelay(search)


  useEffect(()=>{
    if (delayValueApp===undefined) return;
    api.searchProduct(delayValueApp).then((res)=>setСards(res))
  }, [delayValueApp])

  useEffect (()=>{
    api.getProductList().then((res)=>setСards(res.products))
    // api.getUserMe().then((res)=>setUser(res))
  }, [])


  return <div>
    <Header setSearch={setSearch}/>
    <CardList cards = {cards}/>
    <Footer/>
    </div>
  
}

export default App;
