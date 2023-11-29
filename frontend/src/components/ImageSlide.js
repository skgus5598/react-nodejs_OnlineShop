
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgDelete from '../img/imgDelete.png';

const ImageSlide = (props) => {
    let [imageNames, setImageNames] = useState([]);
    let [deleteImgs, setDeleteImgs] = useState([]);
    let { pdId, update , imgset} = props
    //update : true or undefined
    console.log("imageslide updatee: " + update);

    useEffect( () => {
        axios.get(`http://localhost:5000/getImageNames/${props.pdId}`)
            .then(res => {
                setImageNames(res.data);
                console.log("images :  " + JSON.stringify(imageNames));
            }).catch((err) => {
                console.log("imageSlide err : " +  err)
            })         
    },[pdId]);

 


    const deleteImg = (imgName) => {
   
        if(window.confirm('Do you wish to delete this image?')){
            console.log("imagelength :" + imageNames.length)
            if(imageNames.length <= 1){ //at least 1 img needed, 
                alert('At least one image required');
                return false;
            }
            let filter = imageNames.filter(e => e.imgName != imgName)
            setImageNames(filter); // UI
   
            let newArr = [...deleteImgs, imgName];
            setDeleteImgs(newArr) //DB


            imgset(newArr);
        }
    }

    const settings = {
        className: "slider-items",
        infinite: true,
        speed: 500,
        slideToShow: 1,
        dots: true,
        arrows: false
      }
    return(
            <div>
                <Slider {...settings} >
                    {
                        update == undefined 
                            ? imageNames.map( (e, idx) => (  
                                <div key={idx} className="slider-item">
                                    <img key={idx}
                                        src={`http://localhost:5000/images/${e.imgName}`}  />
                                </div>
                                )
                            )
                            : imageNames.map( (e, idx) => (   // from modify
                                <div key={idx} className="slider-item_b">
                                    <img key={idx} className='mainimg' src={`http://localhost:5000/images/${e.imgName}`} />
                                    <div className="bg_hover" />
                                    <div className="bg_hover_text"><img className='subimg' src={imgDelete} onClick={()=>{deleteImg(e.imgName)}}/></div>
                                </div>
                                )
                            ) 
                    }          
                </Slider> 
            </div>  
    )
}

export default ImageSlide;