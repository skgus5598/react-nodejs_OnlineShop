import { useState } from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import AllProducts from './AllProducts';
import avatar from '../img/chicken.png';


const Product_details = () => {
  let navigate =  useNavigate();
  let location = useLocation();
  const data = { ...location.state};
  console.log("details data : " + data)

  return (
    <>
      <div className="detailContainer" >
        <div className="row">
          <div>
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" className="responsive-image" />
          </div>
        </div>
        <br />
        <div className='sellerInfo'>
          <div><img src={avatar} /> </div>
          <div style={{margin: "10px 20px"}}>
            <div><b>{data.userId}</b></div>
            <div>{data.userRegion} {data.userArea} </div>
          </div>
        </div>
        <hr />
        <div style={{ textAlign: "left" }}>
          <h3>{data.pd_title}</h3>
          <span>{data.pd_category}</span><br/><br/>
          <h4><b>£{data.pd_price}</b></h4>
          <span>{data.pd_desc}</span>
          <br /><br />
          <span className='likeSpan'>like 30∙click 189</span>
        </div>


        <hr />
        <div className='popularView'>
            <div>
              <h2>Popular products</h2>
            </div>
            <div>
              <a href='#'>more</a>
            </div>
        </div>
        <AllProducts/>




      </div>
    </>
  )
}

export default Product_details;