import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cities, londonTowns, manchesterTowns, categories } from './SelectAreaObj';
import nodata from '../img/nodata.png';

const AllProducts = () => {
  let navigate = useNavigate();
  let [data, setData] = useState([]);

  const [city, setCity] = useState('0');
  const [town, setTown] = useState('0');
  const [category, setCategory] = useState('0');

  const [noItem, setNoItem] = useState(false);


  useEffect( () => {
    async function getAllProducts(){
      const result = await axios.get('http://localhost:5000/getList', {
        headers : {"Content-Type" : "application/json"}
      }).then( (res => {
        setData(res.data)
      })).catch((err) => { console.log(err)    })
    }
    getAllProducts();
  }, []);


  const onChangeCategoryHandler=(e)=>{
    setCategory(e.currentTarget.value);
    let paramObj = {
      category : e.currentTarget.value,
      city : city,
      town : town
    };
    getListByParam(paramObj);
}
  const onChangeCityHandler=(e)=>{
      setCity(e.currentTarget.value);
      let paramObj = {
        category : category,
        city : e.currentTarget.value,
        town : '0'
      };
      getListByParam(paramObj);
  }
  const onChangeTownHandler=(e)=>{
      setTown(e.currentTarget.value);
      let paramObj = {
        category : category,
        city : city,
        town : e.currentTarget.value
      };

      getListByParam(paramObj)
  }

  const getListByParam = (paramObj) => {    
    axios.post('http://localhost:5000/getListByParam', {
        category : paramObj.category,
        city : paramObj.city,
        town : paramObj.town
    },
      { headers : {"Content-Type" : "application/json"}}
    ).then((res) => {
        if(res.data == ''){
          setNoItem(true);
        }else{
          setData(res.data);
          setNoItem(false);
        }
        
      }).catch((e) => console.log(e));
  }

    return(
        <>
        <div style={{ textAlign: "center", marginTop: "5%", marginBottom: "3%", color:'#fc4103' }}><h1><i>Search for Items around you!</i></h1></div>
            <div className='selectBox'>
                <nav>
                    <select onChange={onChangeCategoryHandler} id="category" value={category}>
                            <option  value="0">CATEGORIES</option>
                            {categories.map((item, index) => (
                                <option key={item.key} value={item.value}>{item.value}</option>
                            ))}
                    </select>
                    <select onChange={onChangeCityHandler} id="city" value={city}>
                        <option  value="0">CITY</option>
                        {cities.map((item, index) => (
                            <option key={item.key} value={item.value}>{item.value}</option>
                        ))}
                    </select>
                    <select onChange={onChangeTownHandler} id="town" value={town}>
                          <option  value="0">TOWN</option>
                        {
                            city == '0'
                                ? <></>
                                : (city == 'London(Greater London)'
                                    ?
                                    londonTowns.map((item, index) => (
                                        <option key={item.key} value={item.value}>{item.value}</option>
                                    ))
                                    : manchesterTowns.map((item, index) => (
                                        <option key={item.key} value={item.value}>{item.value}</option>
                                    ))
                                )
                        }
                    </select>
                </nav>
            </div>
        <div className='Allproducts'>
          
          {
            noItem  
            ? <div className='emptyList'>
                <img src={nodata} />
                <h2>Couldn't find any Items</h2>
              </div> 
            : <div className='cardsWrap'>
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
            }
        </div>
        </>
    )
}

export default AllProducts;