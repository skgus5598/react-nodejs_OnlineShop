import '../../style/Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone ,faPlus, faEnvelope, faHeart, faHouseChimneyUser} from "@fortawesome/free-solid-svg-icons";


const Footer = () => {

    return (
        <footer>
            <div className="container">
                <div className="sec aboutus">
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, unde fugit odit deserunt, aspernatur ad, maxime esse optio ullam blanditiis inventore placeat quos repellat? Tempora sit incidunt impedit vero est earum illo, rerum corporis nesciunt error fuga minima, rem eligendi.</p>
                    <ul className="sci">
                        <li><a href="#"><FontAwesomeIcon style={{color:'white'}} icon={faPlus} /> </a></li>
                        <li><a href="#"><FontAwesomeIcon style={{color:'white'}}  icon={faEnvelope} /></a></li>
                        <li><a href="#"><FontAwesomeIcon style={{color:'white'}}  icon={faHeart} /></a></li>
                        <li><a href="#"><FontAwesomeIcon style={{color:'white'}}  icon={faHouseChimneyUser} /></a></li>
                    </ul>
                </div>
                <div className="sec quicklinks">
                    <div className='credits'>
                    <h2>Credits</h2>
                    <ul>
                        <li><a href="https://www.flaticon.com/free-icons/send" title="send icons">Send icons created by Freepik - Flaticon</a></li>
                        <li><a href="https://www.flaticon.com/free-icons/modify" title="modify icons">Modify icons created by Arkinasi - Flaticon</a></li>
                        <li><a href="https://www.flaticon.com/free-icons/trash" title="trash icons">Trash icons created by Freepik - Flaticon</a></li>
                        <li><a href="https://www.flaticon.com/free-icons/animal" title="animal icons">Animal icons created by Freepik - Flaticon</a></li>
                        <li><a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Vlad Szirka - Flaticon</a></li>
                    </ul>
                    </div>
                </div>
                <div className="sec contact">
                    <h2>Contact Us</h2>
                    <ul className="info">
                        <li><span><FontAwesomeIcon icon={faPhone} /></span><a href="tel:+12345678900">+1 234 567 8900</a></li>
                        <li><span><FontAwesomeIcon icon={faEnvelope} /></span><a href="mailto:krowmore@mailto.meee">2nd@market.com</a></li>
                    </ul>
                </div>
            </div>
        </footer>

    )
};

export default Footer;