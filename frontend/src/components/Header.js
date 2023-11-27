import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'

const Header = () => {
    let navigate = useNavigate();

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand onClick={() => { navigate('/') }}>RAINA's STORE</Navbar.Brand>
                    <Nav className="me-auto" style={{ width: '50%' }}>
                        <div className='searchWrap'>
                            <input placeholder='Type item name'></input>
                            <img
                                style={{ marginRight: "10px" }}
                                src="https://d1unjqcospf8gs.cloudfront.net/assets/home/base/header/search-icon-7008edd4f9aaa32188f55e65258f1c1905d7a9d1a3ca2a07ae809b5535380f14.svg"
                            />
                        </div>
                    </Nav>
                    <Nav className='ml-auto'>
                        <button className='headBtn1' onClick={()=>{ navigate('/upload')}}>+SELL</button>
                        <button className='headBtn2' onClick={()=>{ navigate('/login')}}>LOGIN</button>
                        {/* <Nav.Link onClick={() => { navigate('/detail') }} >PRODUCT</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;