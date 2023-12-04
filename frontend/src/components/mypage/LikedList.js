import { useNavigate, useLocation } from "react-router-dom";
import like from '../../img/like.png';


const LikedList = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='detailContainer'>
                <div className='mypage_headmenu' onClick={()=>{ navigate(-1)}} >
                        <div>
                            <h5>Like List</h5>
                            <img src={like} />
                        </div>
                </div><br/>

            </div>
        
        </>
    )
}
export default LikedList;