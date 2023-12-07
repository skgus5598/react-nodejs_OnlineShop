import {useNavigate, useLocation} from 'react-router-dom'
import listIcon from '../../img/list.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import nodata from '../../img/nodata.png';
import { useSelector } from 'react-redux';

const UploadList = () => {
    let navigate = useNavigate();

    let location = useLocation();
    const data = location.state;

    console.log("data: " + JSON.stringify(data))


    return (
        <>
        <div className='detailContainer'>
            <div className='mypage_headmenu' onClick={()=>{ navigate(-1)}} >
                    <div>
                        <h5>Upload History</h5>
                        <img src={listIcon} />
                    </div>
            </div><br/>
            {
                data == '' 
                ? <div className='emptyList'>
                    <img src={nodata} />
                    <h2>No posts yet</h2>
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
                                return navigate('/myUploadDetail', {state : data[i]})}}>
                            <div className='cardPhoto'>
                                <img src={`http://localhost:5000/images/${e.imgName}`} />
                            </div>
                            <div className='cardDesc'>
                                <h3 className='cardTitle'>{e.pd_title}</h3>
                                <div className='cardPrice'>£{e.pd_price}</div>
                                <div className='cardRegion'>{e.userRegion}, {e.userArea}</div>
                                <span className='likeSpan'>like {e.likeTot}∙click {e.pd_views}</span>
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