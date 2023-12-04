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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'}); 
        navigate('/upload', {state : data})
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
                <div><img src={avatar} /> </div>
                <div style={{ margin: "10px 20px" }}>
                    <div><b>{data.userId}</b></div>
                    <div>{data.userRegion} {data.userArea} </div>
                </div>
                <div className='controllBtn'>
                    <img src={modifyIcon} onClick={() => { modifyBtn() }} />
                    <img style={{ marginLeft: '10px' }} src={deleteIcon} onClick={() => { deleteBtn() }} />
                </div>
            </div>
            <hr />
            <div style={{ textAlign: "left" }}>
                <h3>{data.pd_title}</h3>
                <span>{data.pd_category}</span><br /><br />
                <h4><b>£{data.pd_price}</b></h4>
                {
                    data.pd_desc.split("\r\n").map((line => {
                        return(
                            <span>{line}
                            <br/>
                            </span>
                        )
                    }))
                }
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


const ModifyForm = (props) => {
    let [title, setTitle] = useState('');
    let [price, setPrice] = useState('');
    let [desc, setDesc] = useState('');

    return (
        <>
            <div style={{ textAlign: "left" }}>
                <div>
                    <span>Title</span>
                    <input type="text" placeholder="title" value={props.data.pd_title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div>
                    <span>Price</span>
                    <input type="text" placeholder="£" value={props.data.pd_price} onChange={(e) => { setPrice(e.target.value) }} />
                </div>
                <div>
                    <span>Description</span><br/>
                    <textarea className='inputTextarea' placeholder="Description" value={props.data.pd_desc} onChange={(e) => { setDesc(e.target.value) }} />
                </div>
            </div>
        </>
    )
}

export default MyUploadDetail;