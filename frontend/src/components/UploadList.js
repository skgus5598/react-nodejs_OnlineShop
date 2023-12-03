import {useNavigate} from 'react-router-dom'

import { useEffect, useState } from 'react';
import axios from 'axios';
import nodata from '../img/nodata.png';
import back from '../img/back.png';
import { useSelector } from 'react-redux';

const UploadList = () => {
    let navigate = useNavigate();
    const [list, setList] = useState([]);
    let user_rd = useSelector( (state) => state.persistedReducer.user_rd); //redux

    useEffect( () => {
        const userId = user_rd.userId
        async function getUploadList(){
          const result = await axios.get(`http://localhost:5000/getUploadList/${userId}`, {
            headers : {"Content-Type" : "application/json"}
          }).then( (res => {
            console.log("res.data : " + JSON.stringify(res.data));
            setList(res.data)
          })).catch((err) => {
            console.log("axios err : " +  err)
          })
        }
        getUploadList();
 }, []);

    return (
        <>
        <div className='detailContainer'>
        <img className='backImg' src={back} onClick={()=>{navigate(-1)}} />
            {
                list == '' 
                ? <div className='emptyList'>
                    <img src={nodata} />
                    <h2>No posts yet</h2>
                  </div> 
                : <div className='cardsWrap'>
                {
                    list.map( (e, i) => {
                        return(
                        <article key={i} className='card'>
                            <a className='cardLink' onClick={(e) => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                })
                                return navigate('/myUploadDetail', {state : list[i]})}}>
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
export default UploadList;