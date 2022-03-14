import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [ message, setMessage ] = useState('');
    let navigate = useNavigate();

    const Login = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/login', {
                email: email,
                password: password
            });
            navigate('/home');
        } catch (error) {
            if( error.response ) {
                setMessage(error.response.data.message);
            }
        }
    }

    const signUp = () => {
        navigate('/register');
    }
    
    return (
        <div className='container'>
            <main className='form-container'>
                <div className='signin-signup'>
                    
                    <div className='signin'>
                        <div className='content'>
                            <h2 className='title-signin'>Sign In Account</h2>
                            <div className='divider'></div>
                            <p className='message'>{message}</p>

                            <form onSubmit={Login}>
                                <div className='input-field'>
                                    <i className='fas fa-envelope'></i>
                                    <input type='text' placeholder='Email' value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='input-field'>
                                    <i className='fas fa-lock'></i>
                                    <input type='password' placeholder='Password' value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button className='btn-signin'>
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className='signup'>
                        <h2 className='title-signup'>New Here?</h2>
                        <div className='divider'></div>
                        <p className='text'>lorem ipsum dolor sit amet? meta charset utf-8</p>
                        <button className='btn-signup' onClick={signUp}>Sign up</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login