import { NavLink } from "react-router-dom";
import "./HomeGuest.css";
import image from "../../../../Assets/homePage.jpeg"
import Marquee from "react-fast-marquee";

function HomeGuest(): JSX.Element {
    return (
        <div className="Home">
            <ul className="NavLink">
                <li><NavLink to={"/Home"}>Home</NavLink></li>
                <li className="log"><NavLink exact to={"/Login"}>Login</NavLink></li>
            </ul>
			<Marquee className="Marquee" gradientWidth="0" speed={45} > Welcome to our coupon web site, we wishes you a good visit ! ENJOY ! </Marquee>
            <img className="HomeImage" src={image} alt="" />
        </div>
    );
}

export default HomeGuest;
