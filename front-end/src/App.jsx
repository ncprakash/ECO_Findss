
import './App.css'
import { Toaster } from "sonner"
import {Routes,Route} from 'react-router-dom'
import Login from './Pages/LoginPage/index.jsx'
import Signup from './Pages/Sigin-inPage/index.jsx'
import LandingPage from './Pages/LandingPage/index.jsx'
import AboutPage from './Pages/AboutPage/index.jsx'
import ContactPage from './Pages/ContactPage/index.jsx'
import Dashboard from './Pages/Dashboard/index.jsx'
import AddNewProduct from './Pages/Add-productPage/index.jsx'
import Verification from './Pages/VerificationPage/index.jsx';
import PrivateRoute from './layouts/PrivateRoute.jsx'
import UserDashboard from './Pages/userDashboard/index.jsx' 

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/contact' element={<ContactPage/>} />
        <Route path="/dashboard"element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path='/add-product' element={<AddNewProduct/>} />
        <Route path='/verify' element={<Verification/>} />
        <Route path='/user-dashboard' element={<UserDashboard/>} />  
      </Routes>
      
    </>
  )
}

export default App
