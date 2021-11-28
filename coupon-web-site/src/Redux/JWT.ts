import axios from "axios";
import { loginAction } from "./States/AuthState";
import store from "./Store";

const jwtAxios = axios.create();
jwtAxios.interceptors.request.use((request) => {
  console.log("im here")
  console.log(store.getState().authState.user)
  request.headers = {
    Authorization: store.getState().authState.user
  };
  return request;
});

jwtAxios.interceptors.response.use((response)=>{
    store.dispatch(loginAction(response.headers.authorization))
    console.log(response.headers)
    return response;  
})

export default jwtAxios;
