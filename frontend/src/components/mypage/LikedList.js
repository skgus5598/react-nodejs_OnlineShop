import { useNavigate, useLocation } from "react-router-dom";
import like from '../../img/like.png';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import nodata from '../../img/nodata.png';


const LikedList = () => {
    const navigate = useNavigate();
    let userNo = useSelector((state) => state.persistedReducer.user_rd.userNo); //redux
    
    let location = useLocation();
    const data = location.state

    console.log("data: " + JSON.stringify(data))


    return (
        <>
            <div className='detailContainer'>
                <div className='mypage_headmenu' onClick={() => { navigate('/myPage') }} >
                    <div>
                        <h5>Like List</h5>
                        <img src={like} />
                    </div>
                </div><br />
                <div className='detailAllproducts'>
                    {
                        data == ''
                            ? <div className='emptyList'>
                                <img src={nodata} />
                                <h2>No posts yet</h2>
                            </div>
                            : <div className='cardsWrap'>
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
            </div>

        </>
    )
}
export default LikedList;