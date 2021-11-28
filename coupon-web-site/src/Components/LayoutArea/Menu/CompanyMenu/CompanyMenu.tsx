import "./CompanyMenu.css";
import { NavLink } from "react-router-dom";
import store from "../../../../Redux/Store";
import { logoutAction } from "../../../../Redux/States/AuthState";


function CompanyMenu(): JSX.Element {
    
    const goodBy=()=>{
        store.dispatch(logoutAction());
    }
    
    return (
        <div className="CompanyMenu">
			<ul className="NavLink">
                <li><NavLink to={"/companyHome"}>HOME</NavLink></li>
                <li className="log"><NavLink exact onClick={goodBy} to={"/Home"}>LOGOUT</NavLink></li>
                <li ><NavLink exact to={"/addCoupon"}>ADD COUPON</NavLink></li>
                <li className="log"><NavLink exact to={"/companyDetails"}>PROFILE</NavLink></li>
            </ul>
        </div>
    );
}

export default CompanyMenu;
