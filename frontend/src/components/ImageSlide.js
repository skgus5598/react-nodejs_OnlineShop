
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlide = (props) => {
    let [imageNames, setImageNames] = useState([]);
    let { pdId } = props

    useEffect( () => {
        axios.get(`http://localhost:5000/getImageNames/${props.pdId}`)
            .then(res => {
                setImageNames(res.data);
                console.log("images :  " + imageNames);
            }).catch((err) => {
                console.log("imageSlide err : " +  err)
            })         
    },[pdId])

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
                        imageNames.map( (e, idx) => (  
                            <div className="slider-item">
                            <div className="slider-item-gradient" key={idx}></div>
                                <img 
                                    src={`http://localhost:5000/images/${e.imgName}`}  />
                            </div>
                            )
                        )
                    }          
                </Slider> 
            </div>  
    )
}

export default ImageSlide;