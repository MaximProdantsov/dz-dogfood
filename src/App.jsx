
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import './App.css';
import { LoginAccount } from './components/Authorization/LoginAccount';
import { PasswordRecovery } from './components/Authorization/PasswordRecovery';
import { Registration } from './components/Authorization/Registration';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal/Modal';
import { NotFound } from './components/NotFound/NotFound';
import { CartProductPage } from './pages/CartProductPage/CartProductPage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { DataUser } from './pages/ProfilePage/dataUser';
import { setModalActiv } from './storage/slice/modalSlice';
import { fetchProduct } from './storage/slice/productsSlice';
import { getUser, setAuthorization } from './storage/slice/userSlice';
import { parseJwt } from './utilities/utilities';


function App() {
  const { isAuthorization } = useSelector(s => s.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isAuthorization) return
    dispatch(getUser())
      .then(() => dispatch(fetchProduct()))
  }, [dispatch, isAuthorization])

  useEffect(() => {
    const token = parseJwt(localStorage.getItem('token'))

    if (token && token.exp > new Date() / 1000) {
      dispatch(setAuthorization(true))
    } else {
      dispatch(setModalActiv(true))
      switch (location.pathname) {
        case '/LoginAccount':
          navigate('/LoginAccount')
          break;
        case '/PasswordRecovery':
          navigate('/PasswordRecovery')
          break;
        case '/registration':
          navigate('/registration')
          break;
        default:
          navigate('/LoginAccount')
      }
    }

  }, [dispatch, navigate, location.pathname])


  return <div className='App'>
    <Header />
    <div className='App__container'>
      {isAuthorization ?
        <Routes>
          <Route path='/' element={<CatalogPage />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartProductPage />} />
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
        :
        <Routes>
          <Route path='/' element={<CatalogPage />} />
          <Route path='/LoginAccount' element={<Modal  >
            <LoginAccount />
          </Modal>} />
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
      }
    </div>
    <Footer />
  </div>

}

export default App;
