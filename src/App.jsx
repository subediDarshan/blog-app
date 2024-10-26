import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Footer } from './components/index'
import { logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { login } from './store/authSlice'

function App() {

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  const authStatus = useSelector((state) => (state.auth.status))
  
  useEffect(() => {
    
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
        
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))

  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null





}

export default App
