import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/notify";
import CompanyMenu from "../../Menu/CompanyMenu/CompanyMenu";
import "./CompanyHome.css";
import CompanyCouponList from '../../../MainArea/Company/CompanyCouponList/CompanyCouponList';

function CompanyHome(): JSX.Element {
    
    const history = useHistory()
    useEffect(() => {
        if (store.getState().authState.user == null ){
            notify.error("You must login !");
            history.push("/Home");
        } 
    });
    return (
        <div className="CompanyHome">
			<CompanyMenu/>
            <CompanyCouponList/>
        </div>
    );
}

export default CompanyHome;