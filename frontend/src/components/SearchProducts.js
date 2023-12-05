import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import axios from 'axios';
import { cities, londonTowns, manchesterTowns, categories } from './SelectAreaObj';
import nodata from '../img/nodata.png';

const SearchProducts = () => {
  let navigate = useNavigate();
  const { state } = useLocation(); //search keyword from header
  let [data, setData] = useState([]);

  const [noItem, setNoItem] = useState(false);
 
  useEffect(() => {
    let keyword = state;
    async function getAllProducts() {
      const result = await axios.get(`http://localhost:5000/getList/${keyword}`, {
        headers: { "Content-Type": "application/json" }
      }).then((res => {
        if(res.data == ''){
          setNoItem(true);
        }else{
          setData(res.data);
          setNoItem(false);
        }
      })).catch((err) => { console.log(err) })
    }
    getAllProducts();
  }, [state]);


  return (
    <>
      <div className='itemLists'>
        <div className='Allproducts'><br/><br/>
          {
            noItem
              ? <div className='emptyList'>
                <img src={nodata} />
                <h2>Couldn't find any Items</h2>
              </div>
              : 
              <>
              <div style={{textAlign:'left', paddingBottom:'30px', paddingLeft:'3%'}}>
                <span>7 ITEMS FOUND!</span>
              </div>
              <div className='cardsWrap' style={{justifyContent:"flex-start"}}>
                {
                  data.map((e, i) => {
                    return (
                      <article key={i} className='card'>
                        <a className='cardLink' onClick={(e) => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                          })
                          return navigate('/detail', { state: data[i] })
                        }}>
                          <div className='cardPhoto'>
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
              </>
          }
        </div>
      </div>
    </>
  )
}

export default SearchProducts;