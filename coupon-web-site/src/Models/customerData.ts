import couponData from "./couponData";

class customerData {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  coupons?: couponData[];
}
export default customerData;
