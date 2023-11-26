import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import FileUpload from "./FileUpload";
import axios from "axios";

const UploadForm = () => {
    const [images, setImages] = useState();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');

    let navigate = useNavigate();

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const submitHandler = (e) => {
        e.preventDefault(); //submit이후 페이지 새로고침 방지
        let formdata = new FormData();
        formdata.append("userNo", "2") ; // test
        formdata.append("category", "furnitures") ;
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
                <form onSubmit={submitHandler}>
                    <div className="uploadRow">
                        <FileUpload imgset={updateImages} />
                        <div>
                            <span>Title</span>
                            <input type="text" placeholder="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
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
                    <button type="submit" className="uploadBtn" onClick={submitHandler}>Register</button>
                </form>
                <br /><br />
            </div>


        </>
    )
}

export default UploadForm;