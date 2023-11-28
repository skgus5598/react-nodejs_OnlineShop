import avatar from '../img/chicken.png';
import { useNavigate, useLocation } from "react-router-dom";
import like from '../img/like.png';
import list from '../img/list.png';

const MyPage = () => {
    const navigate = useNavigate();

    let location = useLocation();
    const data = { ...location.state };


    return (
        <>
            <div className='detailContainer'>
                <div className='myPageSellerInfo'>
                    <div className='sellerInfo1'>
                        <div><img src={avatar} /> </div>
                        <div style={{ margin: "10px 20px" }}>
                            <div><b>{data.userId}</b></div>
                            <div>{data.userRegion}, {data.userArea} </div>
                        </div>
                    </div>
                    <div className='sellerInfo2'><button onClick={()=>{navigate('/userInfo')}}>Check My Profile</button></div>
                </div>
                <hr /><br/>
                <div className='menu' >
                    <div className='menu1' onClick={() => { navigate('/uploadList')}}>
                        <h2>Sales History</h2>
                        <img src={list} />
                    </div>
                    <div className='menu2' onClick={() => {navigate('/likedList')}}>
                        <h2>Liked List</h2>
                        <img src={like}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MyPage;