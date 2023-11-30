import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import '../style/Header.css'

const HeaderTest = () => {

    const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);

    return (
        <Header isToggled={isToggled} userToggled={userToggled}>
            {/* 햄버거 버튼(bar) */}
            <div
                className="toggle"
                onClick={() => {
                    setIsToggled(!isToggled);
                }}
            >
                <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
            </div>

            {/* Apple 로고 */}
            <div className="logo">
                <FontAwesomeIcon icon={faApple} />
            </div>

            {/* User 버튼 */}
            <div
                className="user"
                onClick={() => {
                    setUserToggled(!userToggled);
                }}
            >
                <FontAwesomeIcon icon={!userToggled ? faUser : faTimes} />
            </div>

            {/* 메뉴 리스트 */}
            <ul className="header__menulist">
                <li><input className="_1knjz49a" placeholder="Search for anything"></input></li>
                <li>iPad</li>
                <li>iPhone</li>
                <li>고객지원</li>
            </ul>

            {/* User 메뉴 리스트 */}
            <ul className="header__right">
                <li>Login</li>
                <li>Register</li>
            </ul>
        </Header>
    )
}
const Header = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  background-color: yellow;

  .logo {
    margin: 0 1rem;
    font-size: 2rem;
  }

  .header__menulist {
    list-style: none;
    display: flex;
  }

  .header__left {
    display: flex;
  }

  .header__right {
    list-style: none;
    display: flex;
  }

  .header__right div {
    margin: 0 1rem;
  }

  li {
    padding: 0 1rem;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: black;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: black;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }
  }
`;
    /*     <header>
             <nav className="navbar">
                 <div className="navbar_logo">
                  <FontAwesomeIcon icon={faApple} />
                     <a href="#">RAINA</a>
                 </div>
                 <ul className="navbar_menu">
                     <li><a href="#">about</a></li>
                     <li><a href="#">login</a></li>
                     <li><a href="#">search</a></li>
                     <li><a href="#">test</a></li>
                 </ul>
                 <ul className="navbar_icons">
                     <a href="#"> <FontAwesomeIcon icon={faApple} /></a>
                     <a href="#"> <FontAwesomeIcon icon={faBars} /></a>
                 </ul>
                 <a href="#" className="navbar_togglebtn" onClick={()=>{toggleBtn()}}>
                 <FontAwesomeIcon icon={faBars} />
                 </a>
             </nav>
         </header>
 */

    /*       <header className='header'>
               <div className='logo'>
                   <span className='icon'>B</span>
                   <h1 className='title'>바로</h1>
               </div>
               <ul className='menu'>
                   <li>
                       <button className='button'>프로젝트</button>
                   </li>
                   <li>
                       <button className='button'>라운지</button>
                   </li>
                   <li>
                       <button className='button'>랭킹</button>
                   </li>
                   <li>
                       <button className='button'>SIGN IN</button>
                   </li>
               </ul>
           </header>
           
       );
   
   };

   */


    export default HeaderTest;