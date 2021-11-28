import { Component, SyntheticEvent } from "react";
import customerData from "../../../../Models/customerData";
import jwtAxios from "../../../../Redux/JWT";
import notify from "../../../../Services/notify";
import "./UpdateCustomer.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import couponData from '../../../../Models/couponData';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AdminMenu from "../../../LayoutArea/Menu/AdminMenu/AdminMenu";

interface UpdateCustomerProps{
    updateCustomerId:string;
  }
  
  interface UpdateCustomerState {
    customerId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    coupons:couponData[]
  }
  
  class UpdateCustomer extends Component<UpdateCustomerProps, UpdateCustomerState> {
    public constructor(props: UpdateCustomerProps) {
      super(props);
      this.state = {
        customerId: this.props.updateCustomerId,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        coupons:[]
      };
    }
  
    private setFirstName = (args: SyntheticEvent) => {
      const value = (args.target as HTMLInputElement).value;
      this.setState({ firstName: value });
    };
    private setLastName = (args: SyntheticEvent) => {
      const value = (args.target as HTMLInputElement).value;
      this.setState({ lastName: value });
    };
    private setEmail = (args: SyntheticEvent) => {
      const value = (args.target as HTMLInputElement).value;
      this.setState({ email: value });
    };
    private setPassword = (args: SyntheticEvent) => {
      const value = (args.target as HTMLInputElement).value;
      this.setState({ password: value });
    };
  
    private updateData = async () => {
      try {
        const customer = new customerData()
        customer.customerId = this.state.customerId;
        customer.firstName = this.state.firstName;
        customer.lastName = this.state.lastName;
        customer.email = this.state.email;
        customer.password = this.state.password;
        customer.coupons=this.state.coupons;
        await jwtAxios.put(
          "http://localhost:8080/admin/updateCustomer",customer);
          notify.success("Customer updated successfully");
      } catch(err){
        notify.error(err.response.data)
    }
    };
  
    async componentDidMount(){
      console.log("customer number :"+this.props.updateCustomerId);
      const result = await jwtAxios.get("http://localhost:8080/admin/customer/"+this.props.updateCustomerId);
      const updateCustomer = result.data;
      this.setState({
        customerId: updateCustomer.customerId,
        firstName: updateCustomer.firstName,
        lastName: updateCustomer.lastName,
        email:updateCustomer.email,
        password: updateCustomer.password,
        coupons: updateCustomer.coupons
      });
    }
  
  
    public render(): JSX.Element {
      return (
        <div className="card">
          <AdminMenu/> <br />
          <div className="AddBox">
                  <h2>Update customer</h2> <br />
                      <PermIdentityIcon/> 
                      <TextField id="standard-basic" variant="filled" label="First Name" value={this.state.firstName} onChange={this.setFirstName} /> <br /> <br />
                      <PermIdentityIcon/> 
                      <TextField id="standard-basic" variant="filled" label="Last Name" value={this.state.lastName} onChange={this.setLastName} /> <br /> <br />
                      <EmailIcon/> 
                      <TextField id="standard-basic" variant="filled" label="Email" value={this.state.email} onChange={this.setEmail} /> <br /> <br />
                      <LockIcon/> 
                      <TextField id="standard-basic" variant="filled" label="password" value={this.state.password} onChange={this.setPassword} /> <br /> <br /> <br />
                      <Button variant="contained"  onClick={this.updateData}>Submit</Button>
                  </div>
      </div>
      );
    }
  }
  
  export default UpdateCustomer;
  