import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {
    const [loginInfo, setLoginInfo] = useState({email: '', password: ''})
    const navigate = useNavigate()
    console.log(loginInfo)

    function handleChange(e){
        setLoginInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

async function handleLogin(e){
    e.preventDefault();
        // e.preventDefault()
    const {email, password} = loginInfo;
    if(!email || !password) {
        return handleError('email and password are required!');
    }
    try {
        const url = "http://localhost:8080/auth/login"
        const response = await fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo)
        });
        const result = await response.json()
        console.log(result)
        const {success, message,jwtToken, name, error} = result
        if(success){
            localStorage.setItem('token', JSON.stringify(jwtToken));
            localStorage.setItem('loggedInUser', JSON.stringify(name))
            handleSuccess(message)
            setTimeout(() => {
                navigate('/home')
            }, 1000)
        }
        else if(error){
            const details = error?.details[0].message;
            handleError(details)
        }
        else if (!success){
            handleError(message)
        }
    } catch (error) {
        handleError(error);
    }
}
  return (
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin} action="">
            {/* <div>
                <label htmlFor="name">Name</label>
                <input 
                    onChange={handleChange}
                    type='text'
                    name='name'
                    id='name'
                    autoFocus
                    placeholder='Enter your name...'
                    value={loginInfo.name}
                />
            </div> */}

            <div>
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} type="email" name="email" id="email" placeholder='Enter your email...' value={loginInfo.email}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} type="password" name="password" id="password" placeholder='Enter your Password...' value={loginInfo.password}/>
            </div>

            <button  type='submit'>Login</button>
            <span>Does't have an account? 
                <Link to={'/signup'}>Sign Up</Link>
            </span>
        </form>
        <ToastContainer />
 
    </div>
  )
}

export default Login