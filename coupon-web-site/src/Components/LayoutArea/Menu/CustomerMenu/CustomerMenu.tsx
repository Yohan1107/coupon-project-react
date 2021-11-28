import { NavLink } from "react-router-dom";
import { logoutAction } from "../../../../Redux/States/AuthState";
import store from "../../../../Redux/Store";
import "./CustomerMenu.css";

function CustomerMenu(): JSX.Element {
    const goodBy=()=>{
        store.dispatch(logoutAction())
    }
    return (
        <div className="CustomerMenu">
			<ul className="NavLink">
                <li><NavLink to={"/customerHome"}>HOME</NavLink></li>
                <li className="log"><NavLink onClick={goodBy} exact to={"/Home"}>LOGOUT</NavLink></li>
                <li ><NavLink exact to={"/customerCoupons"}>MY COUPONS</NavLink></li>
                <li className="log"><NavLink exact to={"/customerDetails"}>PROFILE</NavLink></li>
            </ul>
        </div>
    );
}

export default CustomerMenu;

