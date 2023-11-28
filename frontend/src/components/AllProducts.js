import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header.js';


const MoreProducts = () => {
  let navigate = useNavigate();
  let [data, setData] = useState([]);

  useEffect( () => {
    async function getAllProducts(){
      const result = await axios.get('http://localhost:5000/getList', {
        headers : {"Content-Type" : "application/json"}
      }).then( (res => {
        console.log("res.data : " + JSON.stringify(res.data));
        setData(res.data)
      })).catch((err) => {
        console.log("axios err : " +  err)
      })
    }
    getAllProducts();
  }, []);

/*
  useEffect( () => {
    console.log("allproducts");
    axios.get('http://localhost:5000/getList', {
      headers : {"Content-Type" : "application/json"}
    }).then( (res => {
      console.log("res.data : " + JSON.stringify(res.data));
      setData(res.data)
    })).catch((err) => {
      console.log("axios err : " +  err)
    })
  }, [])
*/
    return(
        <>
        <div className='otherProducts'>
          
          <br/>
          <div className='cardsWrap'>
            {
              data.map( (e, i) => {
                return(
                  <article key={i} className='card'>
                    <a className='cardLink' onClick={(e) => {
                          window.scrollTo({
                              top: 0,
                              behavior: 'smooth'
                        })
                        return navigate('/detail', {state : data[i]})}}>
                      <div className='cardPhoto'>
                        {/* <img src='https://codingapple1.github.io/shop/shoes1.jpg' /> */}
                        <img src={`http://localhost:5000/images/${e.imgName}`} />
                      </div>
                      <div className='cardDesc'>
                        <h3 className='cardTitle'>{e.pd_title}</h3>
                        <div className='cardPrice'>£{e.pd_price}</div>
                        <div className='cardRegion'>{e.userRegion}, {e.userArea}</div>
                        <span className='likeSpan'>like 30∙click 189</span>
                      </div>
                    </a>
                  </article>
                )
              })
            }
          </div>
        </div>
        </>
    )
}

export default MoreProducts;