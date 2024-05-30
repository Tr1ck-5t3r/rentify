import NavBar from './components/Nav-Bar'
import Listings from './pages/Listings'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Register from './components/Register'
import NotFound from './pages/NotFound'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
function App() {

  return (
    <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard userType="seller" />} />
          <Route path="/:usrname" element={<Profile />}  />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
