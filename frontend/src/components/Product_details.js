import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AllProducts from './AllProducts';
import avatar from '../img/chicken.png';
import like_n from '../img/heart_sm1.png';
import like_y from '../img/heart_sm2.png';
import message from '../img/send_sm.png';

import ImageSlide from './ImageSlide';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Product_details = () => {
  let [images, setImages] = useState([]);
  let [heart, setHeart] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  const data = { ...location.state };
  console.log("details data : " + JSON.stringify(data));

  let [like, setLike] = useState(data.likeTot);


  let { loginCheck, userNo } = useSelector( (state) => state.persistedReducer.user_rd);

  useEffect( () => {
    console.log("? : " + data.id + " / " + data.userNo + " / " + userNo + ' / ' + loginCheck)
      axios.get('http://localhost:5000/getLike',{
        params:{
          pdId : data.id , 
          userNo : userNo
        }
      }).then((res) => {
        if(res.data.result  == 1){ //already clicked  
            console.log("result  1 :  " + res.data.result)
            setHeart(true);
        }else{
          setHeart(false);
        }
      }).catch((e) => console.log(e));
  }, [data])

  const toggleLike = () => {
    if(!loginCheck){
       alert("Please sign in");
       return false;
    }else{
      if(!heart){ 
          updateLike();
          setLike( like += 1 );
          setHeart(true);
      }else{
        deleteLike();
        setLike( like -= 1 );
        setHeart(false);
      }
    }
  }
  const updateLike = () => {
      axios.post('http://localhost:5000/insertLike', {
          pdId : data.id,
          userNo : userNo, //login userNo from userSlice
      }).then((res) => { console.log("insert success")})
      .catch((e) => console.log(e));
  }
  const deleteLike = () => {
      axios.delete('http://localhost:5000/deleteLike', {
        params:{
          pdId : data.id , 
          userNo : userNo
        }
      })
      .then((res) => { console.log("delete success")})
      .catch((e) => {console.log(e)});
  }


  return (
    <>
      <div className="detailContainer" >
        <div className="row">
          <div>
            <ImageSlide pdId={data.id} /><br/>
            {/* <img src={`http://localhost:5000/images/${data.imgName}`} className="responsive-image" /> */}
          </div>

     

        </div>
        <br />
        <div className='sellerInfo'>
          <div className='div1'>
                <div><img src={avatar} /> </div>
                <div style={{ margin: "10px 20px" }}>
                  <div><b>{data.userId}</b></div>
                  <div>{data.userRegion} {data.userArea} </div>
                </div>
          </div>
          <div className='div2'>
              <div>
                <a><img src={heart?like_n:like_y} onClick={()=>{toggleLike()}} /></a>
              </div>
              <div>
                <a><img src={message} /></a>
              </div>
          </div>
        </div>
        <hr />
        <div style={{ textAlign: "left" }}>
          <h3>{data.pd_title}</h3>
          <span>{data.pd_category}</span><br /><br />
          <h4><b>£{data.pd_price}</b></h4>
          <span>{data.pd_desc}</span>
          <br /><br />
          <span className='likeSpan'>like {like}∙view {data.pd_views}</span>
        </div>


        <hr />
        <div className='popularView'>
          <div>
            <h2>Popular products</h2>
          </div>
        </div>
        <div className='detailAllproducts'>
            <AllProducts />
        </div>



      </div>
    </>
  )
}

export default Product_details;