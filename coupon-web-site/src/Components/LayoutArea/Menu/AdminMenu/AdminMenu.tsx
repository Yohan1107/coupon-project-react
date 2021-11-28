import { logoutAction } from "../../../../Redux/States/AuthState";
import store from "../../../../Redux/Store";
import "./AdminMenu.css";
import { NavLink, useHistory } from "react-router-dom";


function AdminMenu(): JSX.Element {
        
    const goodBy=()=>{
    store.dispatch(logoutAction());
}
return (
     <div className="AdminMenu">
        <ul className="NavLink">
            <li><NavLink to={"/adminHome"}>Home</NavLink></li>
            <li className="log"><NavLink exact onClick={goodBy} to={"/Home"}>Logout</NavLink></li>
            <li ><NavLink exact to={"/getAllCompanies"}>Companies</NavLink></li>
            <li ><NavLink exact to={"/getAllCustomers"}>Customers</NavLink></li>
            <li ><NavLink exact to={"/addCompany"}>Add company</NavLink></li>
            <li ><NavLink exact to={"/addCustomer"}>Add customer</NavLink></li>
        </ul>
    </div>
);
}

export default AdminMenu;
