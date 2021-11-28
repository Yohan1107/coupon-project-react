import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../../Redux/Auth/Login/Login";
import AddCompany from "../../MainArea/Admin/AddCompany/AddCompany";
import AddCustomer from "../../MainArea/Admin/AddCustomer/AddCustomer";
import CompanyList from "../../MainArea/Admin/CompanyList/CompanyList";
import CustomerList from "../../MainArea/Admin/CustomerList/CustomerList";
import UpdateCompany from "../../MainArea/Admin/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../MainArea/Admin/UpdateCustomer/UpdateCustomer";
import AddCoupon from "../../MainArea/Company/AddCoupon/AddCoupon";
import "./Routing.css";
import CompanyCouponList from '../../MainArea/Company/CompanyCouponList/CompanyCouponList';
import UpdateCoupon from "../../MainArea/Company/UpdateCoupon/UpdateCoupon";
import HomeGuest from '../Homes/HomeGuest/HomeGuest';
import AdminHome from "../Homes/AdminHome/AdminHome";
import GetCompanyDetails from "../../MainArea/Company/GetCompanyDetail/GetCompanyDetail";
import CustomerCouponList from '../../MainArea/Customer/CustomerCouponList/CustomerCouponList';
import GetCustomerDetail from "../../MainArea/Customer/GetCustomerDetails/GetCustomerDetails";
import PurchaseCoupon from "../../MainArea/Customer/PurchaseCoupon/PurchaseCoupon";
import CompanyHome from "../Homes/CompanyHome/CompanyHome";
import CustomerHome from "../Homes/CustomerHome/CustomerHome";
import Page404 from "../Page404/Page404";

function Routing(): JSX.Element {
    return (
      <div className="Routing">
        <Switch>
          <Redirect from="/" to="/Home" exact/>
          <Route path="/login" component={Login} exact />
          <Route path="/addCompany" component={AddCompany} />
          <Route path="/addCustomer" component={AddCustomer} />
          <Route path="/getAllCompanies" component={CompanyList} />
          <Route path="/updateCompany/:id" render={(props)=><UpdateCompany updateId={props.match.params.id}/>}/>
          <Route path="/getAllCustomers" component={CustomerList} />
          <Route path="/updateCustomer/:id" render={(props)=> <UpdateCustomer updateCustomerId={props.match.params.id}/>} />
          <Route path="/addCoupon" component={AddCoupon}/>
          <Route path="/companyCoupons" component={CompanyCouponList}/>
          <Route path="/updateCoupon/:id" render={(props)=><UpdateCoupon updateCouponId={props.match.params.id}/>}/>
          <Route path="/Home" component={HomeGuest}/>
          <Route path="/adminHome" component={AdminHome}/>
          <Route path="/companyDetails" component={GetCompanyDetails}></Route>
          <Route path="/customerCoupons"  component={CustomerCouponList}></Route>
          <Route path="/customerDetails" component={GetCustomerDetail}></Route>
          <Route path="/purchaseCoupon" component={PurchaseCoupon}></Route>
          <Route path="/companyHome" component={CompanyHome}></Route>
          <Route path="/customerHome" component={CustomerHome}></Route>
          <Route component={Page404}/>
        </Switch>
      </div>
    );
  }
  
  export default Routing;
  
