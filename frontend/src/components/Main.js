import bgimg from '../img/bg.png'
import {useNavigate} from 'react-router-dom'
import AllProducts from './AllProducts';


const Main = () => {
    let navigate = useNavigate();

    return (
        <>
            <div className='main-bg' style={{ backgroundImage: 'url(' + bgimg + ')' }} />
            <div style={{ textAlign: "center", marginTop: "5%", marginBottom: "3%" }}><h1>Popular Items</h1></div>
            <div className='selectBox'>
                <nav>
                    <select>
                        <option>select city</option>
                    </select>
                    <select>
                        <option>select area</option>
                    </select>
                </nav>
            </div>
            <div className='itemLists'>
                <AllProducts/>
            </div>
            <button>more</button>
        </>
    )
}
export default Main;