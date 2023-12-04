import avatar from '../../img/chicken_big.png';
import { useNavigate, useLocation } from "react-router-dom";
import like from '../../img/like.png';
import list from '../../img/list.png';
import letter from '../../img/letter.png';
import { useSelector } from 'react-redux';

const MyPage = () => {
    const navigate = useNavigate();
    let user = useSelector( (state) => state.persistedReducer.user_rd);

   // let location = useLocation();
    //const data = { ...location.state };


    return (
        <>
            <div className='detailContainer'>
                <div className='menu' >
                    <div  onClick={() => { navigate('/profile')}}>
                            <h5>Profile</h5>
                            <img src={avatar}/>
                    </div>
                    <div onClick={() => { navigate('/uploadList')}}>
                        <h5>Upload History</h5>
                        <img src={list}/>
                    </div>
                    <div onClick={() => {navigate('/likedList')}}>
                        <h5>Liked List</h5>
                        <img src={like}/>
                    </div>
                    <div onClick={() => {navigate('/likedList')}}>
                        <h5>Message</h5>
                        <img src={letter}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MyPage;