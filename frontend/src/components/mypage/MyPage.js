import avatarImg from '../../img/chicken_big.png';
import { useNavigate } from "react-router-dom";
import likeImg from '../../img/like.png';
import listImg from '../../img/list.png';
import letterImg from '../../img/letter.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';

const MyPage = () => {
    const navigate = useNavigate();
    let userNo = useSelector((state) => state.persistedReducer.user_rd.userNo); //redux
    
    const getUploadList = () => {
        axios.get(`http://localhost:5000/getListByParam_b/`, {
            params: {
                userNo : userNo
            }
          }).then( (res => { navigate('/uploadList', {state : res.data})
          })).catch((err) => {  console.log(err)  })
    }

    const getLikedList = () => {
        axios.get(`http://localhost:5000/getLikeList/${userNo}`)
            .then((res) => {  navigate('/likedList' ,  {state : res.data})    
            }).catch((e) => console.log(e));
    }
    

    return (
        <>
            <div className='detailContainer'>
                <div className='menu' >
                    <div  onClick={() => { navigate('/profile')}}>
                            <h5>Profile</h5>
                            <img src={avatarImg}/>
                    </div>
                    <div onClick={() => { getUploadList()}}>
                        <h5>Upload History</h5>
                        <img src={listImg}/>
                    </div>
                    <div onClick={() => { getLikedList()}}>
                        <h5>Liked List</h5>
                        <img src={likeImg}/>
                    </div>
                    <div onClick={() => {}}>
                        <h5>Message</h5>
                        <img src={letterImg}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MyPage;