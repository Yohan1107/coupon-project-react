import { Component, SyntheticEvent } from "react";
import companyData from "../../../../Models/companyData";
import jwtAxios from "../../../../Redux/JWT";
import notify from "../../../../Services/notify";
import "./UpdateCompany.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import couponData from '../../../../Models/couponData';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AdminMenu from "../../../LayoutArea/Menu/AdminMenu/AdminMenu";

interface UpdateCompanyState {
    companyId: string;
    name?: string;
    email?: string;
    password?: string;
    coupons:couponData[]
  }
  
  interface updateCompanyProps{
    updateId:string
  }
  
  class UpdateCompany extends Component<updateCompanyProps, UpdateCompanyState> {
    public constructor(props: updateCompanyProps) {
      super(props);
      this.state = {
        companyId: this.props.updateId,
        name: "",
        email: "",
        password: "",
        coupons:[]
      };
    }
  
    private setEmail = (args: SyntheticEvent) => {
      const value = (args.target as HTMLInputElement).value;
      this.setState({
        email: value,
      });
    };
    private setPassword = (args: SyntheticEvent) => {
      const value = (args.target as HTMLInputElement).value;
      this.setState({
        password: value,
      });
    };
  
    private updateData = async () => {
      try{
        const company = new companyData();
        company.companyId=this.state.companyId;
        company.name = this.state.name;
        company.email = this.state.email;
        company.password = this.state.password;
        company.coupons = this.state.coupons;
        console.log(company)
        await jwtAxios.put("http://localhost:8080/admin/updateCompany", company);
        notify.success("Company " + this.state.companyId + " was updated");
      } catch {
        notify.error("ERROR! Company was not updated");
      }
    };
  
    async componentDidMount(){
      const result = await jwtAxios.get("http://localhost:8080/admin/company/"+this.props.updateId);
      const updateCompany = result.data;
      this.setState({
        companyId: updateCompany.companyId,
        name: updateCompany.name,
        email: updateCompany.email,
        password: updateCompany.password,
        coupons:updateCompany.coupons
      });
    }
  
    public render(): JSX.Element {
      
      return (
        <div className="UpdateCompany">
          <AdminMenu/>
          <div className="AddBox">
                  <h2>Update company</h2> <br />
                      <PermIdentityIcon/> 
                      <TextField id="standard-basic" variant="filled" label="name" disabled value={this.state.name}  /> <br /> <br />
                      <EmailIcon/> 
                      <TextField id="standard-basic" variant="filled" label="email" value={this.state.email} onChange={this.setEmail} /> <br /> <br />
                      <LockIcon/> 
                      <TextField id="standard-basic" variant="filled" label="password" value={this.state.password} onChange={this.setPassword} /> <br /> <br />
                      <Button variant="contained"  onClick={this.updateData}>Submit</Button>
                  </div>
          </div>
      );
    }
  }
  
  export default UpdateCompany;
  