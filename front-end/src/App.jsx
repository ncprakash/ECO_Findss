
import './App.css'

import {Routes,Route} from 'react-router-dom'
import Login from './Pages/LoginPage/index.jsx'
import Signup from './Pages/Sigin-inPage/index.jsx'
import LandingPage from './Pages/LandingPage/index.jsx'
import AboutPage from './Pages/AboutPage/index.jsx'
import ContactPage from './Pages/ContactPage/index.jsx'
import ProductDetails from './Pages/ProductDetailPage'
import AddNewProduct from './Pages/Add-productPage/index.jsx'
import Verification from './Pages/VerificationPage/index.jsx';
import PrivateRoute from './layouts/PrivateRoute.jsx'
import UserDashboard from './Pages/userDashboard/index.jsx' 
import Community from './Pages/Communitypage/CommunityPage'
import ChatDebugger from './components/ChatDebugger'
import ChatRoom from './Pages/ChatRoom/index.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/contact' element={<ContactPage/>} />
        <Route path='/community' element={<Community/>}/>

        <Route path='/add-product' element={<AddNewProduct/>} />
        <Route path='/verify' element={<Verification/>} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path='/chat-debug' element={<ChatDebugger />} />
        <Route path='/chat/:roomId' element={<ChatRoom />} />

        <Route path='/user-dashboard' element={<PrivateRoute><UserDashboard/></PrivateRoute>} />  
      </Routes>
      
    </>
  )
}

export default App
