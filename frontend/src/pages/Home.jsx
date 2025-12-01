import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if(user){
      setLoggedInUser(JSON.parse(user));
    }
 
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = "https://authenication-app-nileshsinghofficials-projects.vercel.app/product";
        const headers = {
          headers: {
            'Authorization' : JSON.parse(localStorage.getItem('token'))
          }
        }
        const response = await fetch(url, headers)
        const result = await response.json();
        console.log(result)
        setProducts(result)
      } catch (error) {
      handleError(error)
    }
    
  }
  fetchProducts()
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser')
    handleSuccess('User Loggout Successfully')
    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }
  return (
    <div>
      <h1>Welcome, {loggedInUser}</h1>
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
         products?.map((data) => (
            <ul key={data.id}>
              <span>{data.name} : {data.price}</span>
            </ul>
          ))
        }
      </div>

    <ToastContainer/>
    </div>
  )
}

export default Home
