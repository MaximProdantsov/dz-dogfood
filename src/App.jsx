
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.css';
import { LoginAccount } from './components/Authorization/LoginAccount';
import { PasswordRecovery } from './components/Authorization/PasswordRecovery';
import { Registration } from './components/Authorization/Registration';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal/Modal';
import { NotFound } from './components/NotFound/NotFound';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { DataUser } from './pages/ProfilePage/dataUser';
import { fetchProduct } from './storage/slice/productsSlice';
import { getUser } from './storage/slice/userSlice';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
      .then(() => dispatch(fetchProduct()))
  }, [dispatch])

  return <div>
      <Header />
      <Routes>
        <Route path='/' element={<CatalogPage />} />
        <Route path='product/:id' element={<ProductPage />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/profile/data' element={<DataUser />} />
        <Route path='/registration' element={<Modal  >
          <Registration />
        </Modal>} />
        <Route path='/LoginAccount' element={<Modal  >
          <LoginAccount />
        </Modal>} />
        <Route path='/PasswordRecovery' element={<Modal  >
          <PasswordRecovery />
        </Modal>} />
      </Routes>
      <Footer />
  </div>

}

export default App;
