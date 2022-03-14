import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    const [ confPassword, setConfPassword] = useState('');
    const [ message, setMessage ] = useState('');
    let navigate = useNavigate();

    const register = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/user', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            })
            navigate('/')
        } catch (error) {
            if(error.response){
                setMessage(error.response.data.message);
            }
        }
    };

    const signIn = () => {
        navigate('/')
    }

    return (
        <div className='container'>
            <main className='form-container'>
                <div className='signin-signup'>
                    
                    <div className='signin'>
                        <div className='content'>
                            <h2 className='title-signin'>Sign up</h2>
                            <div className='divider'></div>
                            <p className='message'>{message}</p>

                            <form onSubmit={register}>
                                <div className='input-field'>
                                    <i className='fas fa-user'></i>
                                    <input type='text' placeholder='Username' value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
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
                                <div className='input-field'>
                                    <i className='fas fa-lock'></i>
                                    <input type='password' placeholder='Confirm Password' value={confPassword}
                                        onChange={(e) => setConfPassword(e.target.value)}
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
                        <button className='btn-signup' onClick={signIn}>Sign in</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Register;