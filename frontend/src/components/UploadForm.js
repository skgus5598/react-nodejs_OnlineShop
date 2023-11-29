import { useEffect, useState } from "react";
import {useNavigate, useLocation} from 'react-router-dom'
import FileUpload from "./FileUpload";
import axios from "axios";
import back from '../img/back.png';
import ImageSlide from './ImageSlide';

const UploadForm = () => {
    let navigate = useNavigate();

    const [images, setImages] = useState();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [pdId, setPdId] = useState('');

    let [user, setUser] = useState([]);

    //modify data
    let location = useLocation();
    const modifyData = { ...location.state };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("userCookie")));
        if(modifyData.pd_title !== undefined){
            console.log("? : " + modifyData.pd_title)
            setTitle(modifyData.pd_title);
            setPrice(modifyData.pd_price);
            setDesc(modifyData.pd_desc);
            setCategory(modifyData.pd_category);
            setPdId(modifyData.id);
        }
    },[])

    const updateImages = (newImages) => {
        setImages(newImages);
    }
 
    const modifyHandler = (e) => {
        e.preventDefault();
        let body = {
            id : pdId,
            userNo : user.userNo,
            category : category,
            title : title,
            price : price,
            desc : desc,
            filename : images
        }        
        // Order is important. Image file must come last
        console.log("modifyhandler images : " + JSON.stringify(images))

        axios.put('http://localhost:5000/updateProduct', {
            id : pdId,
            userNo : user.userNo,
            category : category,
            title : title,
            price : price,
            desc : desc,
            filename : images
        },
        { headers : {"Content-Type" : "application/json"} }
        ).then(res => {
            if(res.data.success){
                alert('Modify Success');
                navigate('/uploadList');
            }else{ alert("Modify Fail" )   } 
        }).catch((e) => {  alert("Server ERROR " , e )   })      

    }

    const submitHandler = (e) => {
        e.preventDefault(); //submit이후 페이지 새로고침 방지
        let formdata = new FormData();
        formdata.append("userNo", user.userNo) ; // test
        formdata.append("category", category) ;
        formdata.append("title", title)
        formdata.append("price", price)
        formdata.append("desc", desc)

        // Order is important. Image file must come last
        images.forEach((e)=>{
            formdata.append("file", e)
        })

        axios.post('http://localhost:5000/upload', formdata,
            { headers: { "Content-Type": "multipart/form-data" } }
        ).then(res => {
            if(res.data.success){
                alert('Upload Success');
                navigate('/');
            }else{
                alert("Upload Fail" )
            }
        }).catch((err) => {
            alert("Server ERROR " , err )
        })      
    }
/* <Select>
    const Continents= [
        {key:1, value:"Africa"},
        {key:2, value:"Asia"},
        {key:3, value:"America"},
        {key:4, value:"Europe"},
        {key:5, value:"Austrailia"},
        {key:6, value:"North America"},
        {key:7, value:"South America"},  
    ]
*/
    return (
        <>
            <div className="detailContainer" >
                {
                    modifyData.pd_title !== undefined
                        ? <img className='backImg' src={back} onClick={() => { navigate(-1) }} />
                        : <></>
                }
                <form onSubmit={submitHandler}>
                    <div className="uploadRow">
                        {
                            modifyData.pd_title !== undefined
                                ?<div style={{paddingLeft:'25px'}}>
                                    <ImageSlide pdId={modifyData.id} update='true' imgset={updateImages} /><br/>
                                 </div>
                                :<>
                                     <FileUpload imgset={updateImages} />
                                 </>
                        }
                       
                        <div>
                            <span>Title</span>
                            <input type="text" placeholder="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                        <div>
                            <span>Category</span>
                            <input type="text" placeholder="category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                        </div>
                        <div>
                            <span>Price</span>
                            <input type="text" placeholder="£" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        </div>
                        <div>
                            <span>Description</span>
                            <textarea placeholder="Description" value={desc} onChange={(e) => { setDesc(e.target.value) }} />
                        </div>
                        {/* <select onChange={continentChangeHandler} value={Continent}>
                            {Continents.map(item =>(
                                    <option key={item.key} value={item.key}>{item.value}</option>
                            ))}
                        </select> */}
                    </div>
                    {
                        modifyData.pd_title !== undefined
                            ?   <button type="submit" className="uploadBtn" onClick={modifyHandler}>Modify</button>
                            :   <button type="submit" className="uploadBtn" onClick={submitHandler}>Register</button>
                    }
                    
                </form>
                <br /><br />
            </div>


        </>
    )
}

export default UploadForm;