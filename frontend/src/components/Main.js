import bgimg from '../img/bg.png'
import {useNavigate} from 'react-router-dom'
import AllProducts from './AllProducts';
import mainBanner from '../img/mainBanner.png';



const Main = () => {
    let navigate = useNavigate();
    return (
        <>
            <div className='main-bg' style={{ backgroundImage: 'url(' + mainBanner + ')' }} />
            <div className='itemLists'>
                <AllProducts/>
            </div>
        </>
    )
}
export default Main;