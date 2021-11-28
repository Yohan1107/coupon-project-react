import { Component, SyntheticEvent } from "react";
import "./AddCustomer.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import customerData from "../../../../Models/customerData";
import jwtAxios from "../../../../Redux/JWT";
import notify from "../../../../Services/notify";
import AdminMenu from "../../../LayoutArea/Menu/AdminMenu/AdminMenu";

interface AddCustomerState {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  lastNameError: boolean;
  lastNameErrorText: string;
  firstNameError: boolean;
  firstNameErrorText: string;
  emailError: boolean;
  emailErrorText: string;
  passwordError: boolean;
  passwordErrorText: string;
}

class AddCustomer extends Component<{}, AddCustomerState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      lastNameError: true,
      lastNameErrorText: "",
      firstNameError: true,
      firstNameErrorText: "",
      emailError: true,
      emailErrorText: "",
      passwordError: true,
      passwordErrorText: "",
    };
  }

  private setEmail = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    if (value.length > 15) {
      this.setState({
        email: value,
        emailError: false,
      });
    } else {
      this.setState({
        emailError: true,
        emailErrorText: "Email must contain min 15 characters",
      });
    }
  };
  private setFirstName = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    if (value.length > 4) {
      this.setState({
        firstName: value,
        firstNameError: false,
      });
    } else {
      this.setState({
        firstNameError: true,
        firstNameErrorText: "First name must contain min 5 characters",
      });
    }
  };
  private setLastName = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    if (value.length > 4) {
      this.setState({
        lastName: value,
        lastNameError: false,
      });
    } else {
      this.setState({
        lastNameError: true,
        lastNameErrorText: "Last name must contain min 5 characters",
      });
    }
  };
  private setPassword = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    if (value.length > 8) {
      this.setState({
        password: value,
        passwordError: false,
      });
    } else {
      this.setState({
        passwordError: true,
        passwordErrorText: "Password must contain min 9 characters",
      });
    }
  };

  private postData = async () => {
    if (
      this.state.firstNameError === false &&
      this.state.lastNameError === false &&
      this.state.emailError === false &&
      this.state.passwordError === false
    ) {
      try {
        const customer = new customerData();
        customer.firstName = this.state.firstName;
        customer.lastName = this.state.lastName;
        customer.email = this.state.email;
        customer.password = this.state.password;
        const result = await jwtAxios.post(
          "http://localhost:8080/admin/addCustomer",
          customer
        );
        const response = result.data;
        console.log(response);
        notify.success("Customer added successfully");
      } catch (err) {
        notify.error(err.response.data);
      }
    } else {
      notify.error("You must enter the required characters");
    }
  };

  public render(): JSX.Element {
    return (
      <div className="AddCompany">
        <AdminMenu />
        <div className="AddBox">
          <h2>Add a new customer</h2> <br />
          <PermIdentityIcon />
          <TextField
            id="standard-basic"
            variant="filled"
            label="First Name"
            onChange={this.setFirstName}
            helperText={this.state.firstNameErrorText}
            error={this.state.firstNameError}
            required
          />{" "}
          <br /> <br />
          <PermIdentityIcon />
          <TextField
            id="standard-basic"
            variant="filled"
            label="Last Name"
            onChange={this.setLastName}
            helperText={this.state.lastNameErrorText}
            error={this.state.lastNameError}
            required
          />{" "}
          <br /> <br />
          <EmailIcon />
          <TextField
            id="standard-basic"
            variant="filled"
            label="Email"
            onChange={this.setEmail}
            helperText={this.state.emailErrorText}
            error={this.state.emailError}
            required
          />{" "}
          <br /> <br />
          <LockIcon />
          <TextField
            id="standard-basic"
            variant="filled"
            label="password"
            onChange={this.setPassword}
            helperText={this.state.passwordErrorText}
            error={this.state.passwordError}
            required
          />{" "}
          <br /> <br />
          <Button variant="contained" onClick={this.postData}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
