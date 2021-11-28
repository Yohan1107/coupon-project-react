import "./Page404.css";
import image from "../../../Assets/NotFoud404.jpg"

function Page404(): JSX.Element {
    return (
        <div className="Page404">
			<img className="errorPage" src={image} alt=""/>
        </div>
    );
}

export default Page404;