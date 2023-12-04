import { useNavigate, useLocation } from "react-router-dom";
import avatar from '../../img/chicken.png';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';

const Profile = () => {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('');
    const [area, setArea] = useState('');
    let user = useSelector( (state) => state.persistedReducer.user_rd);

    useEffect(() => {
        axios.get(`http://localhost:5000/getUserInfo/${user.userNo}`)
            .then((res) => {
                console.log('get profile success : ' + JSON.stringify(res.data));
                setNickname(res.data.userId);
                setEmail(res.data.userEmail);
                setRegion(res.data.userRegion);
                setArea(res.data.userArea);
            })
            .catch((e) =>{console.log(e)});
    },[])

    return (
        <div className="detailContainer" >
            <div className='mypage_headmenu' onClick={()=>{ navigate(-1)}} >
                <div>
                    <h5>Profile</h5>
                    <img src={avatar} />
                </div>
            </div>
            <div className="profile_form">
                <Form>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" value={user.userId || ''} readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>NICKNAME</Form.Label>
                        <Form.Control type="text" value={nickname|| ''} onChange={(e)=>{ setNickname(e.target.value)}} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>EMAIL</Form.Label>
                        <Form.Control type="text" value={email|| ''} onChange={(e)=>{ setEmail(e.target.value)}} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>REGION</Form.Label>
                        <Form.Control type="text" value={region || ''} onChange={(e)=>{ setRegion(e.target.value)}} />
                    </Form.Group>
                    {/* <Form.Select>     
                        <option value="value"> </option>
                    </Form.Select> */}
                    <Form.Group>
                        <Form.Label>AREA</Form.Label>
                        <Form.Control type="text" value={area} onChange={(e)=>{ setArea(e.target.value)}} />
                    </Form.Group>
                    <button className="profile_save_btn"> SAVE </button>
                </Form>
            </div>

        </div>

    )
}

export default Profile;