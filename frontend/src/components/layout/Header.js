import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEnvelope, faHeart, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import unknownUser from '../../img/unknownUser.png';
import '../../style/Header.css'
import mainlogo from '../../img/mainlogo.png';
import { useNavigate} from 'react-router-dom';
import chicken from '../../img/chicken.png';
import glass from '../../img/glass.png';

import { useDispatch, useSelector } from 'react-redux';
import {  clearUser } from '../../redux/userSlice.js';
import axios from "axios";


const Header = () => {
  let navigate = useNavigate();
  let { userNo, loginCheck, userRegion } = useSelector( (state) => state.persistedReducer.user_rd);
  let dispatch = useDispatch(); // send request to store.js(redux)

  let [keyword, setKeyword] = useState('');

  console.log("header loginCheck  :" + loginCheck)

  const addBtn = () => {
    if(!loginCheck){
      navigate('/login')
    }else{
      // if userRegion&area is null => navigate to mypage/profile
      if(userRegion === "0"){ navigate('/profile')}
      else navigate('/upload')
     

    }
};

const logoutBtn = () => {
  if(window.confirm("Do you want to log out?")){
      dispatch(clearUser());
      return navigate("/")
  }
}
const searchHandler = (e) => {
  setKeyword(e.currentTarget.value);

}
const handleOnKeyPress = e => {
  if(e.key == 'Enter'){
    navigate('/searchProducts', { state: keyword});
  }
}

const getLikedList = () => {
  if(!loginCheck){
    alert('Please Sign in first');
    navigate('/login')
  }else{
    axios.get(`http://localhost:5000/getLikeList/${userNo}`)
    .then((res) => {  navigate('/likedList' ,  {state : res.data})    
    }).catch((e) => console.log(e));
  }
  
}

  return (
    <React.Fragment>
      <div
        style={{
          zIndex:9999,
          position: "sticky",
          top: "0px",
          width: "100%",
          backgroundColor: "#FFFFFF",
          paddingTop:'15px'
        }}
      >
        <div className="headerTop">
          <div className='headerLeft' >
            <Image
              onClick={() => {
                navigate('/')
              }}
              src={mainlogo}
            ></Image>
            <InputWrap>
              <div className="headerInput">
                <Input value={keyword} onChange={searchHandler} onKeyDown={handleOnKeyPress}  placeholder="Search for anything"></Input>
                <img 
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  src={glass}
                  onClick={ () => { navigate('/searchProducts', { state: keyword})}}
               />
              </div>
            </InputWrap>
          </div>
          <div className="headerMenuDiv" >
            <a className="headerMenu0" style={{ width: '25%'}} >
              <img className="inputwrapImg"
                    src={glass}
                    onClick={ () => { navigate('/searchProducts', { state: keyword})}}
               />
            </a>
            <a className="headerMenu1" onClick={() => {addBtn()}}>
              <FontAwesomeIcon style={{
                color: "#495057",
                verticalAlign: "middle",
                display: "inline-block",
              }} icon={faPlus} />
              <Button ><span>Add a Listing</span></Button>
            </a>

            <a className="headerMenu" style={{ width: '25%'}} onClick={() => {getLikedList()}} >
              <FontAwesomeIcon style={{
                color: "#495057",
                verticalAlign: "middle",
                display: "inline-block",
              }} icon={faHeart} size="lg" />
            </a>
            <a className="headerMenu" style={{ width: '25%', cursor:'pointer'  }} onClick={() => { alert("Comming soon!")}} >
              <FontAwesomeIcon style={{
                color: "#6f6f6f",
                verticalAlign: "middle",
                display: "inline-block",
              }} icon={faEnvelope} size="lg" />
            </a>
          </div>
          {
            loginCheck
              ? <>
                  <img className="signinIcon" src={chicken} onClick={(e) => {
                          window.scrollTo({
                              top: 0,
                              behavior: 'smooth'
                        })
                        return navigate('/myPage')}}/>
                  <a className="headerMenuLogout" onClick={() => {logoutBtn()}} >
                    <FontAwesomeIcon style={{
                        color: "#495057",
                        verticalAlign: "middle",
                        display: "inline-block",
                      }} icon={faArrowRightFromBracket} />
                    <Button ><span>Logout</span></Button>
                  </a>
                </>
              : <>
                  <img className="signinIcon" src={unknownUser} />
                  <Button2 onClick={() => { navigate('/login')} } >   Sign in  </Button2>
                </>
          }
          
        </div>
      </div>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;

const InputWrap = styled.div`
  width:100%;
    border-radius: 5px;
    border: solid 1px #e9ecef;
    text-decoration: none;
    height: 40px;
    box-sizing: border-box;
    margin: 10px 20px;
    
    @media screen and (max-width:768px){
      display:none;
    }
    
  `;


const Input = styled.input`
    outline : none;
    border: hidden;
    margin: 0px;
    padding: 5px;
    width: 100%;
    font-size: 16px;
    font-weight: 500;
    margin: auto;
    -webkit-appearance: none;
  // margin-top: 3px;
    background-color: transparent;

    
  `;

const Image = styled.img`
    cursor:pointer
  `;

const Select = styled.select`
  border-radius: 5px;
  text-align : left;

    outline : none;
    border: hidden;
    margin: 0px;
    padding: 5px;
    width: 50%;
    font-size: 13px;
    font-weight: 500;
    margin: auto;
    -webkit-appearance: none;
    background-color: grey;
    background: #f9f2f2 url(https://d1unjqcospf8gs.cloudfront.net/assets/home/articles/icon-arrow-down-ea33c4b4c74ce0aca95580c70c5ba1f464ff5833213b0fc8db5de0fab98b57e1.svg) no-repeat 89% 50%;  `;


const Button = styled.div`
    display: inline-block;
    color: #495057;
    font-size: 14px;
    margin-left: 8px;
    font-weight: 700;
    vertical-align: middle;
  `;

const Button2 = styled.button`
    width: 140px;
    border-radius: 5px;
    border: solid 1px #ffdcc5;
    box-sizing: border-box;
    text-decoration: none;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    padding: 7px;
    height: 40px;
    margin: 0px 5px;
    background-color: #ffffff;
    color: #666666;
  `;

