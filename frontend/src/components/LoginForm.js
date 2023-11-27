import React, { useState } from 'react';
import './../style/LoginForm.css';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import arrow from './../img/arrow.png';

const LoginForm = () => {
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginIdChange = (e) => {
        setLoginId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    //Login Cookie create
    const expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes()+30) // 30mins

    const obj = {
        value : loginId,
        expire : expireTime.toUTCString() // GMT
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`id: ${loginId}, Password: ${password}`);

        axios.post('http://localhost:5000/user/login', {
            userId : loginId,
            userPwd : password
        }, {
            headers : {"Content-Type" : "application/json"}
        }).then( res => {
            console.log(res.data);
            if(res.data.result == 1){
              //  localStorage.setItem("userCookie", JSON.stringify(obj))
                console.log(res.data.accessToken)
                navigate('/')
            }else if(res.data.result == 2){
                alert("ID does not exist")
            }else if(res.data.result == 3) {
                alert("Please re-enter your password")
            }
        })

    };
    return (
        <>
        <div className="login-form">
            <h1>Please Login </h1><br/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">Id</label>
                    <input
                        type="text"
                        id="id"
                        value={loginId}
                        onChange={handleLoginIdChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" style={{width : '100%'}}>Login</button>
            </form>
            <br/>
            <label className='login-alink'> Don't you have an account?
                <a href='' onClick={ () => {navigate('/signUp')}} style={{width : '100%'}}>
                    <h2><img src={arrow} /> SIGN UP </h2>
                </a>
            </label>
        </div>
        </>
    );
};

export default LoginForm;
