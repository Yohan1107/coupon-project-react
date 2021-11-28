import { combineReducers } from "redux";
import { authReducer } from "./States/AuthState";
import { createStore } from "redux";
import { companyReducer } from "./States/CompanyState";
import { couponReducer } from "./States/CouponState";
import { customerReducer, customerState } from './States/CustomerState';

const reducers = combineReducers({ authState: authReducer, companyState: companyReducer,couponState:couponReducer,customerState:customerReducer });
const store = createStore(reducers);
export default store;
