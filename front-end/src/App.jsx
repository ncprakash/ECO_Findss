
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './Pages/LoginPage/index.jsx'
import Signup from './Pages/Sigin-inPage/index.jsx'
import LandingPage from './Pages/LandingPage/index.jsx'
import ListingPage from './Pages/ListingPage/index.jsx'
import AboutPage from './Pages/AboutPage/index.jsx'
import ContactPage from './Pages/ContactPage/index.jsx'
import Dashboard from './Pages/Dashboard/index.jsx'
import AddNewProduct from './Pages/Add-productPage/index.jsx'
import ProductDetailPage from './Pages/ProductDetailPage/index.jsx'
import CheckoutPage from './Pages/CheckOutPage/index.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/my-listing' element={<ListingPage/>}/>
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/contact' element={<ContactPage/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-product' element={<AddNewProduct/>} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path='/cart' element={<CheckoutPage/>} />
      </Routes>
    </>
  )
}

export default App
