import { Component, SyntheticEvent } from "react";
import couponData from "../../../../Models/couponData";
import jwtAxios from "../../../../Redux/JWT";
import notify from "../../../../Services/notify";
import "./AddCoupon.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import CompanyMenu from "../../../LayoutArea/Menu/CompanyMenu/CompanyMenu";

interface AddCouponState {
  category: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  amount: string;
  price: string;
  image: string;
  titleError: boolean;
  amountError: boolean;
  priceError: boolean;
  descriptionError: boolean;
  titleErrorText: string;
  descriptionErrorText: string;
  amountErrorText: string;
  priceErrorText: string;
}

class AddCoupon extends Component<{}, AddCouponState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      category: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      amount: "",
      price: "",
      image: "",
      titleError: true,
      amountError: true,
      priceError: true,
      descriptionError: true,
      titleErrorText: "",
      descriptionErrorText: "",
      amountErrorText: "",
      priceErrorText: "",
    };
  }

  handleCategory = (option: any) => {
    this.setState({
      category: option.value,
    });
  };
  handleTitle = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    if (value.length > 4) {
      this.setState({
        title: value,
        titleError: false,
      });
    } else {
      this.setState({
        titleError: true,
        titleErrorText: "Title must contain 5 characters",
      });
    }
  };
  handleDescription = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    if (value.length > 19) {
      this.setState({
        description: value,
        descriptionError: false,
      });
    } else {
      this.setState({
        descriptionError: true,
        descriptionErrorText: "Description must contain min 20 characters",
      });
    }
  };
  handleStartDate = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    this.setState({
      startDate: value,
    });
  };
  handleEndDate = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    this.setState({
      endDate: value,
    });
  };
  handleAmount = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    if (parseInt(value) > 0) {
      this.setState({
        amount: value,
        amountError: false,
      });
    } else {
      this.setState({
        amountError: true,
        amountErrorText: "Amount must be positive number",
      });
    }
  };
  handlePrice = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    if (Number(value) > 0) {
      this.setState({
        price: value,
        priceError: false,
      });
    } else {
      this.setState({
        priceError: true,
        priceErrorText: "Price must be positive",
      });
    }
  };
  handleImage = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    this.setState({
      image: value,
    });
  };

  postData = async () => {
    if (
      this.state.descriptionError === false &&
      this.state.priceError === false &&
      this.state.amountError === false &&
      this.state.titleError === false
    ) {
      const coupon = new couponData();
      coupon.category = this.state.category;
      coupon.title = this.state.title;
      coupon.description = this.state.description;
      coupon.startDate = this.state.startDate;
      coupon.endDate = this.state.endDate;
      coupon.amount = this.state.amount;
      coupon.price = this.state.price;
      coupon.image = this.state.image;
      try {
        const result = await jwtAxios.post(
          "http://localhost:8080/company/addCoupon",
          coupon
        );
        console.log("Hi friend");
        console.log(result);
        notify.success("Coupon added successfully");
      } catch (err) {
        notify.error(err.response.data);
      }
    } else {
      notify.error("You must enter the required characters");
    }
  };

  public render(): JSX.Element {
    const options = [
      { value: "FOOD", label: "Food" },
      { value: "VACATIONS", label: "Vacations" },
      { value: "ELECTRICITY", label: "Electricity" },
      { value: "CLEANING_PRODUCTS", label: "Cleaning-products" },
      { value: "SPORT_ACCESSORIES", label: "Sport-Accessories" },
      { value: "HOME", label: "Home" },
      { value: "CAR_ACCESSORIES", label: "Car accessories" },
      { value: "KIDS", label: "Kids" },
      { value: "PETS", label: "Pets" },
    ];

    return (
      <div className="addCoupon">
        <CompanyMenu />
        <form>
          <div className="AddBox">
            <h3>Add Coupon</h3>
            <TextField
              className="textField"
              onChange={this.handleTitle}
              variant="filled"
              label="title"
              error={this.state.titleError}
              helperText={this.state.titleErrorText}
              required
            />{" "}
            <span> </span>
            <TextField
              variant="filled"
              onChange={this.handleImage}
              name="image"
              label="image"
            />{" "}
            <br /> <br />
            <TextField
              variant="filled"
              onChange={this.handleAmount}
              type="number"
              label="amount"
              error={this.state.amountError}
              helperText={this.state.amountErrorText}
              required
            />{" "}
            <span> </span>
            <TextField
              variant="filled"
              onChange={this.handlePrice}
              label="price"
              type="number"
              error={this.state.priceError}
              helperText={this.state.priceErrorText}
              required
            />{" "}
            <br /> <br />
            <Select
              className="categorySelect"
              onChange={this.handleCategory}
              options={options}
              placeholder="CATEGORY"
            />{" "}
            <br /> <br />
            <TextField
              label="startDate"
              onChange={this.handleStartDate}
              type="date"
              defaultValue="2021-07-26"
            />{" "}
            <br /> <br />
            <TextField
              label="endDate"
              onChange={this.handleEndDate}
              type="date"
              defaultValue="2021-07-26"
            />{" "}
            <br /> <br />
            <TextField
              variant="filled"
              onChange={this.handleDescription}
              label="description"
              multiline
              maxRows={5}
              error={this.state.descriptionError}
              helperText={this.state.descriptionErrorText}
              required
            />{" "}
            <br /> <br />
            <Button onClick={this.postData} variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCoupon;
