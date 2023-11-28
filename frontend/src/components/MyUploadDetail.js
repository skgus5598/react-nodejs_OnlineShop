import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import avatar from '../img/chicken.png';
import ImageSlide from './ImageSlide';
import axios from 'axios';
import back from '../img/back.png';
import deleteIcon from '../img/delete.png';
import modifyIcon from '../img/modify.png';

const MyUploadDetail = () => {

    let navigate = useNavigate();
    let location = useLocation();
    const data = { ...location.state };
    console.log("details data : " + JSON.stringify(data));

    const deleteBtn = () => {
        if(window.confirm('Do you want to delete this product?')){
            axios.delete(`http://localhost:5000/deleteList/${data.id}`)
            .then(res => {
                navigate(-1)
            });
        } 
    }
    const modifyBtn = () => {

    }

    return (

        <div className="detailContainer" >
            <img className='backImg' src={back} onClick={()=>{navigate(-1)}} />
            <div className="row">
                <div>
                    <ImageSlide pdId={data.id} /><br />
                    {/* <img src={`http://localhost:5000/images/${data.imgName}`} className="responsive-image" /> */}
                </div>
            </div>
            <br />
            <div className='sellerInfo'>
                <div><img src={avatar} /> </div>
                <div style={{ margin: "10px 20px" }}>
                    <div><b>{data.userId}</b></div>
                    <div>{data.userRegion} {data.userArea} </div>
                </div>
                <div className='controllBtn'>
                    <img style={{marginRight:'10px'}} src={deleteIcon} onClick={ () => {deleteBtn()}}/>
                    <img src={modifyIcon} onClick={ () => {modifyBtn()}} />
                </div>
            </div>

            <hr />
            <div style={{ textAlign: "left" }}>
                <h3>{data.pd_title}</h3>
                <span>{data.pd_category}</span><br /><br />
                <h4><b>£{data.pd_price}</b></h4>
                <span>{data.pd_desc}</span>
                <br /><br />
                <span className='likeSpan'>like 30∙click 189</span>
            </div>
            <hr />
            <div className='bumpBtn'>
                <button>Bring Up My Post</button>
            </div>
        </div>
    )
}
export default MyUploadDetail;