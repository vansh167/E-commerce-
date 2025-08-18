import Navbar from './components/navbar/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSignUp from './pages/LoginSignUp'
import ShopCategory from './pages/ShopCategory'
import Footer from './components/footer/Footer'
import men_banner from './components/Assets/banner_mens.png'
import kid_banner from './components/Assets/banner_kids.png'
import women_banner from './components/Assets/banner_women.png'


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/mens' element={<ShopCategory banner={men_banner} category= "men"/>}/>
          <Route path='/womens' element={<ShopCategory banner={women_banner} category= "women"/>}/>
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category= "kid"/>}/>
          <Route path='product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignUp/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
