import { Container, Modal } from '@mui/material';
import Footer from './components/Footer';
import Header from './components/Header';
import Routers from './routers';
import "./App.css"

import { Box } from '@mui/system';
import Auth from './components/Auth';
import AuthModal from './components/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './redux/CategorySlice';
import { useEffect } from 'react';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  
  
  return (
    <div>
      <Header />
      <Container disableGutters maxWidth={"lg"} sx={{ minHeight: '100vh'}}>
        <Routers />
      </Container>
      {
        !isLoggedIn &&
        <AuthModal/>
      }
      <Footer />
     
    </div>
  );
}

export default App;
