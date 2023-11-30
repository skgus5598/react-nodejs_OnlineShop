import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";
import avatar from '../img/chicken.png';
import write from '../img/write.png'
const Header = () => {
    let navigate = useNavigate();
    let [user, setUser] = useState([]);

    useEffect( () => {
        const ifUser = localStorage.getItem("userCookie");
        console.log("header ifuser : " + ifUser);
        if(ifUser){
            setUser(JSON.parse(ifUser))
        }
    }, [])

    const logoutBtn = () => {
        if(window.confirm("Do you want to log out?")){
            localStorage.removeItem("userCookie")
            setUser('');
            return navigate("/")
        }
    }

    const sellBtn = () => {
        if(user != ''){
            navigate('/upload')
        }else{
            navigate('/login')
        }
    }

    const myPageBtn = () => {
        navigate('/myPage', {state : user})
    }

    


    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand onClick={() => { navigate('/') }}>RAINA's STORE</Navbar.Brand>
                    <Nav className="me-auto" style={{ width: '50%' }}>
                        <div className='searchWrap'>
                            <form className='searchForm'>
                             <input placeholder='Type item name'></input>
                            </form>
                            <img
                                style={{ marginRight: "10px" }}
                                src="https://d1unjqcospf8gs.cloudfront.net/assets/home/base/header/search-icon-7008edd4f9aaa32188f55e65258f1c1905d7a9d1a3ca2a07ae809b5535380f14.svg"
                            />
                        </div>
                    </Nav>
                    <Nav className='ml-auto'>
                        <button className='headBtn1' onClick={()=>{ sellBtn() }}><img src={write} /></button>
                        {
                            user == ''|| user == null 
                                ? <button className='headBtn2' onClick={()=>{ navigate('/login')}}>LOGIN</button>
                                : <div style={{display:"flex"}}>
                                    <button className='headBtn2' onClick={()=>{ logoutBtn() }}>LOGOUT</button>
                                    <img src={avatar}  style={{width:'50px', height:'50px', cursor: 'pointer'}} onClick={()=>{ myPageBtn()}}/>
                                  </div>
                        }               
                        {/* <Nav.Link onClick={() => { navigate('/detail') }} >PRODUCT</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;