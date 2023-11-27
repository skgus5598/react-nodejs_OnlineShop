import React, { useState } from 'react';
import './../style/LoginForm.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import arrow from './../img/arrow.png';

const SignUpForm = () => {

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');
    const [nickName, setNickName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginIdChange = (e) => {
        setLoginId(e.target.value);
        document.getElementById('idCheckBtn').value = 0;
    };
    const handleNicknameChange = (e) => {
        setNickName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const idCheck = () => {
        console.log("idCheck : " + loginId)
        document.getElementById('tempDiv').remove();

        const html = document.createElement("div");
        html.id = 'tempDiv';

        axios.get(`http://localhost:5000/user/checkId/${loginId}`)
             .then( res => {
                if(JSON.stringify(res.data.result) == '0'  ){
                    document.getElementById('idCheckBtn').value = 1;
                    html.innerHTML = "<span id='child' style=color:blue><b>Available</b></span>"
                }else{
                    document.getElementById('idCheckBtn').value = 2;
                    html.innerHTML = "<span id='child' style=color:red><b>Already existed</b></span>"
                }
                document.getElementById('idCheckResult').append(html);
            }).catch(e => {
                console.log("server error : " + e)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("? " + document.getElementById('idCheckBtn').value)
        console.log(`id : ${loginId}, Email: ${email}, Password: ${password}`);
        console.log(loginId +"/" + password +"/" + email)
        if( document.getElementById('idCheckBtn').value != 1) {
            alert("아이디 중복확인을 해주세요")
            return false;
        }else{
            axios.post('http://localhost:5000/user/signUp', {
                userId : loginId,
                userPwd : password,
                userEmail : email
            }, {
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then( res => {
                console.log(res.data);
                if(res.data.userId != null){
                    alert("회원가입이 완료되었습니다. 로그인을 해주세요");
                    navigate('/login');
                }else{
                    alert("회원가입에 실패하였습니다.")
                }
            })
        }
    };

    return (
        <>
        <div className="login-form">
            <h1>JOIN US  <br/> </h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div style={{display:"flex"}}>
                        <div style={{width :"70%"}}>
                            <label htmlFor="id">Id</label>
                            <input
                                type="text"
                                id="id"
                                value={loginId}
                                onChange={handleLoginIdChange}
                                required
                            />
                        </div>
                        <div>
                            <label><button id={'idCheckBtn'} value={0} type={"button"} onClick={ idCheck } style={{marginTop:"35px"}}> ID check</button></label>
                        </div>
                    </div>
                    <div id='idCheckResult'>
                        <div id='tempDiv'></div>
                    </div><br/>

                    <div>
                        <label>NickName</label>
                        <input type="text"
                            id="nicknamee"
                            value={nickName}
                            onChange={handleNicknameChange}
                            disabled />
                    </div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" style={{width : '100%'}}>REGISTER</button>
            </form>
            <label className='login-alink'> Already have an account?
                <a href='' onClick={ () => {navigate('/login')}} style={{width : '100%'}}>
                    <h2><img src={arrow} /> LOGIN </h2>
                </a>
            </label>

        </div>
        </>
    );
};

export default SignUpForm;
