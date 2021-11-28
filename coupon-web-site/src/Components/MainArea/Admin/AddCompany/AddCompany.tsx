import { Component, SyntheticEvent } from "react";
import companyData from "../../../../Models/companyData";
import jwtAxios from "../../../../Redux/JWT";
import notify from "../../../../Services/notify";
import "./AddCompany.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AdminMenu from "../../../LayoutArea/Menu/AdminMenu/AdminMenu";

interface AddCompanyState {
    name:string;
    email:string;
    password:string;
    nameTextError:string;
    emailTextError:string;
    passwordTextError:string;
    nameError:boolean;
    emailError:boolean;
    passwordError:boolean;
}

class AddCompany extends Component<{}, AddCompanyState> {
    
    public constructor(props: {}) {
        super(props);
        this.state = {
            name:"",
            email:"",
            password:"",
            nameTextError:"",
            passwordTextError:"",
            emailTextError:"",
            nameError:true,
            emailError:true,
            passwordError:true,
        };
    }
    
    private setEmail = (args:SyntheticEvent)=>{
        const value = (args.target as HTMLInputElement).value
        if (value.length>15) {
        this.setState({
            email:value,
            emailError:false,
            emailTextError:""
        })
        }else{
            this.setState({
                emailTextError:"Email must contain 15 characters minimum",
                emailError:true
            })
        }
    }
    private setName = (args:SyntheticEvent)=>{
        const value = (args.target as HTMLInputElement).value;
        if (value.length > 9) {
            this.setState({
                name:value,
                nameError:false,
                nameTextError:""
            })
        }else{
            this.setState({
                nameTextError:"Name must contain minimum 9 characters",
                nameError:true
        }
            )}
    }
    private setPassword = (args:SyntheticEvent)=>{
        const value = (args.target as HTMLInputElement).value
        if (value.length > 9) {
            this.setState({
                password:value,
                passwordError:false,
                passwordTextError:""
            })
        }else{
            this.setState({
                passwordTextError:"Password must contain min 9 characters",
                passwordError:true
            })
        }
    }

    private postData = async()=>{
        if(this.state.nameError === false &&this.state.emailError === false &&this.state.passwordError === false ){
        try{
            const company = new companyData()
            company.name=this.state.name;
            company.email=this.state.email;
            company.password=this.state.password;
            const result = await jwtAxios.post("http://localhost:8080/admin/addCompany/",company)
            const response = result.data
            console.log(response)
            notify.success("Company added successfully")
        }catch(err){ 
            notify.error(err.response.data)
        }
    }else{
      notify.error("You must enter the required characters")  
    }
    }

    public render(): JSX.Element {
        return (
            <div className="AddCompany">
                <AdminMenu/>
                <div className="AddBox">
                <h1>Add a new company</h1> <br />
                    <PermIdentityIcon/> 
                    <TextField id="standard-basic" variant="filled" label="name" onChange={this.setName} helperText={this.state.nameTextError} error={this.state.nameError} required/> <br /> <br />
                    <EmailIcon/> 
                    <TextField id="standard-basic" variant="filled" label="email" onChange={this.setEmail} helperText={this.state.emailTextError} error={this.state.emailError} required/> <br /> <br />
                    <LockIcon/> 
                    <TextField id="standard-basic" variant="filled" label="password" onChange={this.setPassword} helperText={this.state.passwordTextError} error={this.state.passwordError} required /> <br /> <br />
                    <Button variant="contained"  onClick={this.postData}>Submit</Button>
                </div>
            </div>
        );
    }
}

export default AddCompany;

