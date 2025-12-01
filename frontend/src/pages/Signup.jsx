import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Signup() {
    const [signupInfo, setSignInfo] = useState({name: '', email: '', password: ''})
    const navigate = useNavigate()
    console.log(signupInfo)

    function handleChange(e){
        setSignInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

async function handleSignup(e){
    e.preventDefault();
        // e.preventDefault()
    const {name , email, password} = signupInfo;
    if(!name || !email || !password) {
        return handleError('name, email and password are required!');
    }
    try {
        const url = "http://localhost:8080/auth/signup"
        const response = await fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json()
        console.log(result)
        const {success, message, error} = result
        if(success){
            handleSuccess(message)
            setTimeout(() => {
                navigate   ('/login')
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
        <h1>SignUp</h1>
        <form onSubmit={handleSignup} action="">
            <div>
                <label htmlFor="name">Name</label>
                <input 
                    onChange={handleChange}
                    type='text'
                    name='name'
                    id='name'
                    autoFocus
                    placeholder='Enter your name...'
                    value={signupInfo.name}
                />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} type="email" name="email" id="email" placeholder='Enter your email...' value={signupInfo.email}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} type="password" name="password" id="password" placeholder='Enter your Password...' value={signupInfo.password}/>
            </div>

            <button  type='submit'>Signup</button>
            <span>Already have an account? 
                <Link to={'/login'}>Login</Link>
            </span>
        </form>
        <ToastContainer />
 
    </div>
  )
}

export default Signup