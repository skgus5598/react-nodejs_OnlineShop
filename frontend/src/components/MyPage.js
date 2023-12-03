import avatar from '../img/chicken.png';
import { useNavigate, useLocation } from "react-router-dom";
import like from '../img/like.png';
import list from '../img/list.png';
import letter from '../img/letter.png';
import { useSelector } from 'react-redux';

const MyPage = () => {
    const navigate = useNavigate();
    let user = useSelector( (state) => state.persistedReducer.user_rd);

    let location = useLocation();
    const data = { ...location.state };


    return (
        <>
            <div className='detailContainer'>
                <div className='myPageSellerInfo'>
                    <div className='sellerInfo1'>
                        <div><img src={avatar} /> </div>
                        <div style={{ margin: "10px 20px" }}>
                            <div><b>{user.userId}</b></div>
                            <div>{user.userRegion}, {user.userArea} </div>
                        </div>
                    </div>
                    <div className='sellerInfo2'><button onClick={()=>{navigate('/userInfo')}}>Check My Profile</button></div>
                </div>
                <hr /><br/>
                <div className='menu' >
                    <div className='menu1' onClick={() => { navigate('/uploadList')}}>
                        <h5>Upload History</h5>
                        <img src={list}/>
                    </div>
                    <div className='menu2' onClick={() => {navigate('/likedList')}}>
                        <h5>Liked List</h5>
                        <img src={like}/>
                    </div>
                    <div className='menu3' onClick={() => {navigate('/likedList')}}>
                        <h5>Message</h5>
                        <img src={letter}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MyPage;