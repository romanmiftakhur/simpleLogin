import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Home = () => {

    const [ name, setName] = useState('');
    const [ token, setToken] = useState('');
    const [ expire, setExpire] = useState('');
    const [ message, setMessage] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async() => {
        try {
            const response = await axios.get('http://localhost:8080/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            console.log(decoded);
        } catch (error) {
            if(error.response){
                setMessage(error.response.data.message)
            }
        }
    }

    const logout = async() => {
        try {
            await axios.delete('http://localhost:8080/logout');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <header>
                <div className='header-left'>
                    <h1>Pusri</h1>
                </div>
                <div className='header-right'>
                    <button onClick={logout}>Logout</button>
                </div>
            </header>
            <main>
                <p>Welcome {message}</p>
            </main>
            <footer>
                <p>Copyright 2022</p>
            </footer>
        </>
    )
}

export default Home