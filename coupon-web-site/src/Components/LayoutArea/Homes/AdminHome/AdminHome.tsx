import AdminMenu from "../../Menu/AdminMenu/AdminMenu";
import "./AdminHome.css";
import Marquee from "react-fast-marquee";
import image from "../../../../Assets/homePage.jpeg"
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/notify";


function AdminHome(): JSX.Element {
  
    const history = useHistory()
    useEffect(() => {
        if (store.getState().authState.user == null ){
            notify.error("You must login !");
            history.push("/Home");
        } 
    });
    return (
        <div className="AdminHome">
			<AdminMenu/>
            <Marquee className="Marquee" gradientWidth="0" speed={45}  > Welcome back admin! </Marquee>
            <img className="HomeImage" src={image} alt="" />
        </div>
    );
}

export default AdminHome;
