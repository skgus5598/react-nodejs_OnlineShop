import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import axios from 'axios';
import glass from '../img/glass.png'
import { cities, londonTowns, manchesterTowns, categories } from './SelectAreaObj';
import nodata from '../img/nodata.png';

const SearchProducts = () => {
  let navigate = useNavigate();
  let { state } = useLocation(); //search keyword from header
  let [data, setData] = useState([]);

  const [noItem, setNoItem] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');
 
  useEffect(() => {
    getListByKeyword();
  }, [state]);

  async function getListByKeyword() {
    let keyword = state;
    const result = await axios.get(`http://localhost:5000/getListByParam_b`, {
      params:{
        keyword: keyword
      }
    }).then((res => {
      if(res.data == ''){
        setNoItem(true);
      }else{
        setData(res.data);
        setNoItem(false);
      }
    })).catch((err) => { console.log(err) })
  }



  const detailHandler = (i) => {
    data[i].pd_views += 1;

    axios.put('http://localhost:5000/addViewCnt',{
        pdId : data[i].id
      },{ headers : {"Content-Type" : "application/json"}}
      ).then((res) => console.log("success"))
       .catch((e) => console.log(e));

    window.scrollTo({top: 0, behavior: 'smooth' });
    navigate('/detail', {state : data[i]})
  }


  const searchHandler = (e) => {
    setSearchKeyword(e.currentTarget.value);
  }
  const handleOnKeyPress = (e) => {
    if(e.key == 'Enter'){
      //event
      state = e.currentTarget.value;
      getListByKeyword();
    }
  }


  return (
    <>
      <div className='mediaqSearchBox'>
        <div className='headerInput'>
          <input type='text' value={searchKeyword} onChange={searchHandler} onKeyDown={handleOnKeyPress}  placeholder="Search for anything" />
          <img src={glass} />
        </div>
      </div>
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
              <div className='itemsFound' >
                <h5> {data.length} ITEMS FOUND!</h5>
              </div>
              <div className='cardsWrap' style={{justifyContent:"flex-start"}}>
              {
              data.map( (e, i) => {
                return(
                  <article key={i} className='card'>
                    <a className='cardLink' onClick={(e) => { detailHandler(i) }} >
                        {/* return navigate('/detail', {state : data[i]})}}> */}
                      <div className='cardPhoto'>
                        <img src={`http://localhost:5000/images/${e.imgName}`} />
                      </div>
                      <div className='cardDesc'>
                        <h3 className='cardTitle'>{e.pd_title}</h3>
                        <div className='cardPrice'>£{e.pd_price}</div>
                        <div className='cardRegion'>{e.userRegion}, {e.userArea}</div>
                        <span className='likeSpan'>like {e.likeTot}∙view {e.pd_views}</span>
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