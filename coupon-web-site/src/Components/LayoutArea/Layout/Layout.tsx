import "./Layout.css";
import Header from "../Header/Header";
import "./Layout.css";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { BrowserRouter } from "react-router-dom";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Layout;

