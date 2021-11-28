import credentialModel from "../../../Models/credentialModel";
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import clientType from "../../../Models/ClientType";
import userDetails from "../../../Models/userDetails";
import notify from "../../../Services/notify";
import  axios  from "axios";
import store from "../../Store";
import { loginAction } from "../../States/AuthState";
import "./Login.css"


function Login(): JSX.Element {
  const history = useHistory(); //redirect function
  const { register, handleSubmit } = useForm<credentialModel>();
  async function send(credential: credentialModel) {
    switch (credential.clientType) {
      case clientType.ADMINISTRATOR:
        try {
          console.log(credential);
          const response = await axios.post<userDetails>("http://localhost:8080/admin/login",credential);
          store.dispatch(loginAction(response.data));
          console.log("new token:" + response.data);
          notify.success("You have been successfully logged in !!!");
          history.push("/adminHome")
        } catch (err) {
          notify.error(err.response.data);
        }
        break;
      case clientType.COMPANY:
        try {
          const response = await axios.post<userDetails>("http://localhost:8080/company/login",credential);
          store.dispatch(loginAction(response.data));
          console.log("new token:" + response.data);
          notify.success("you have been successfully logged in !!!");
          history.push("/companyHome");
        } catch (err) {
          notify.error(err.response.data);
        }
        break;
      case clientType.CUSTOMER:
        try {
          console.log(credential)
          const response = await axios.post<userDetails>("http://localhost:8080/customer/login",credential );
          store.dispatch(loginAction(response.data));
          console.log("new token:" + response.data);
          notify.success("you have been successfully logged in !!!");
          history.push("/customerHome");
        } catch (err) {
          notify.error(err.response.data);
        }
        break;
    }
  }
  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(send)}>
        <div className="user-box">
          <input type="email" name="userEmail" ref={register} />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input type="password" name="userPassword" ref={register} />
          <label>Password</label>
        </div>
        <div className="user-box">
          <select name="clientType" ref={register}>
            <option value="ADMINISTRATOR"> ADMIN </option>
            <option value="COMPANY"> COMPANY </option>
            <option value="CUSTOMER"> CUSTOMER </option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default Login;
