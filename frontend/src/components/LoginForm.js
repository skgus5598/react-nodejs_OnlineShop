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
    expireTime.setMinutes(expireTime.getMinutes()+1) // 1mins

    const obj = {
        value : loginId,
        expire : expireTime.toUTCString() // GMT
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`id: ${loginId}, Password: ${password}`);

        axios.post('http://localhost:8899/user/login', {
            userId : loginId,
            userPwd : password
        }, {
            headers : {"Content-Type" : "application/json"}
        }).then( res => {
            console.log(res.data);
            if(res.data == 3){
                //    localStorage.setItem("userCookie", JSON.stringify(res.data))
                localStorage.setItem("userCookie", JSON.stringify(obj))

                navigate('/')

            }else if(res.data == 1){
                alert("존재하지 않는 아이디입니다.")
            }else if(res.data == 2) {
                alert("비밀번호를 다시 입력해주세요")
            }
        })

    };

/* >> spring security test
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`id: ${loginId}, Password: ${password}`);

        axios.post('http://localhost:8899/user/login', {
            username : loginId,
            password : password
        }, {
            //headers : {"Content-Type" : "application/json"}
            headers : {"Content-Type" : "application/x-www-form-urlencoded"} //spring-security
        }).then( res => {
            console.log("data : " + res.data);

        }).catch((e)  => console.log("e" + e))

    };
*/
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
