import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import avatar from '../../img/chicken.png';
import ImageSlide from '../ImageSlide';
import axios from 'axios';
import back from '../../img/back.png';
import deleteIcon from '../../img/delete.png';
import modifyIcon from '../../img/modify.png';

const MyUploadDetail = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const data = { ...location.state };
    console.log("details data : " + JSON.stringify(data));


    const deleteBtn = () => {
        if (window.confirm('Do you want to delete this product?')) {
            axios.delete(`http://localhost:5000/deleteList/${data.id}`)
                .then(res => {
                    navigate(-1)
                });
        }
    }
    const modifyBtn = () => {
        window.scrollTo({ top: 0,  behavior: 'smooth'});
        navigate('/upload', { state: data })
    }

    const bumpBtn = () => {
        axios.put('http://localhost:5000/bumpMyList',{
            pdId : data.id
          },{ headers : {"Content-Type" : "application/json"}}
          ).then((res) => alert("Success BUMP!"))
           .catch((e) => console.log(e));
    
        window.scrollTo({top: 0, behavior: 'smooth' });
    }

    return (

        <div className="detailContainer" >
            <img className='backImg' src={back} onClick={() => { navigate(-1) }} />
            <div className="row">
                <div>
                    <ImageSlide pdId={data.id} /><br />
                </div>
            </div>
            <br />
            <div className='sellerInfo'>
                <div className='div1'>
                    <div><img src={avatar} /> </div>
                    <div style={{ margin: "10px 20px" }}>
                        <div><b>{data.userId}</b></div>
                        <div>{data.userRegion}, {data.userArea} </div>
                    </div>
                </div>
                <div className='div2'>
                    <div>
                        <a><img src={modifyIcon} onClick={() => { modifyBtn() }} /></a>
                    </div>
                    <div>
                        <a><img src={deleteIcon} onClick={() => { deleteBtn() }} /></a>
                    </div>
                </div>
            </div>
            <hr />
            <div style={{ textAlign: "left" }}>
                <h3>{data.pd_title}</h3>
                <span>{data.pd_category}</span><br /><br />
                <h4><b>£{data.pd_price}</b></h4>
                {
                    data.pd_desc.split("\r\n").map((line => {
                        return (
                            <span>{line}
                                <br />
                            </span>
                        )
                    }))
                }
                <br /><br />
                <span className='likeSpan'>like 30∙click 189</span>
            </div>


            <hr />
            <div className='bumpBtn'>
                <button onClick={() => { bumpBtn() }}>Bring Up My Post</button>
            </div>
        </div>
    )
}



export default MyUploadDetail;