import React, { useContext } from 'react';
import { useState } from 'react';


export const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const opts = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        }
        fetch('http://192.168.0.74:3001/api/token', opts)
            .then(resp => {
                if(resp.status === 200) return resp.json();
                else alert("There was an issue");
            })
            .then(data =>{
                sessionStorage.setItem('token', data.access_token);
                console.log(data.access_token);
            })
            .catch(error =>{
                console.error(error);
            })

    }

    return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>React App</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='email' name='email' onChange={event => setEmail(event.target.value)}/>
                <input type="password" placeholder='password' name='password' onChange={event => setPassword(event.target.value)}/>
                <button type='submit'>Sign In</button>
            </form>
            <p>Don't have an account? <a href="/Register">Register</a></p>
        </div>
    </div>
  )
}

export default Login;