import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/notify";
import PurchaseCoupon from "../../../MainArea/Customer/PurchaseCoupon/PurchaseCoupon";
import CustomerMenu from "../../Menu/CustomerMenu/CustomerMenu";
import "./CustomerHome.css";

function CustomerHome(): JSX.Element {
    const history = useHistory();

    useEffect(() => {
        if (store.getState().authState.user == null ){
            notify.error("You must login !");
            history.push("/Home");
        } 
    });

    return (
        <div className="CustomerHome">
			<CustomerMenu/>
            <PurchaseCoupon/>
        </div>
    );
}

export default CustomerHome;
