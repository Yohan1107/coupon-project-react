import { Component, SyntheticEvent } from "react";
import couponData from "../../../../Models/couponData";
import jwtAxios from "../../../../Redux/JWT";
import { getCouponAction } from "../../../../Redux/States/CouponState";
import store from "../../../../Redux/Store";
import "./CustomerCouponList.css";
import Select from "react-select";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from "../../../../Assets/CouponImage.jpeg"
import CustomerMenu from "../../../LayoutArea/Menu/CustomerMenu/CustomerMenu";


interface CustomerCouponListState {
	coupons:couponData[];
}

class CustomerCouponList extends Component<{}, CustomerCouponListState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
			coupons:[],
        };
    }

    async componentDidMount(){
        const result = await jwtAxios.get("http://localhost:8080/customer/customerCoupons")
        const coupons = result.data;
        this.setState({
            coupons: coupons
        })
        store.dispatch(getCouponAction(coupons))
        console.log("its me")
        console.log( store.getState().couponState.coupons)
    }
    
    handleCategory=(category:any)=>{
     const categoryCoupons = store.getState().couponState.coupons.filter(item=>{return item.category===category.value})
     this.setState({
         coupons:categoryCoupons
     })
    }

    handleMaxPrice=(price:SyntheticEvent)=>{
        const value = (price.target as HTMLInputElement).value
        const priceCoupons= store.getState().couponState.coupons.filter(item=>{return item.price<value})
        this.setState({coupons:priceCoupons})
    }

    public render(): JSX.Element {
        const options = [
            {value:"FOOD",label:"Food"},
            {value:"VACATIONS",label:"Vacations"},
            {value:"ELECTRICITY",label:"Electricity"},
            {value:"CLEANING_PRODUCTS",label:"Cleaning-products"},
            {value:"SPORT_ACCESSORIES",label:"Sport-Accessories"},
            {value:"HOME",label:"Home"},
            {value:"CAR_ACCESSORIES",label:"Car accessories"},
            {value:"KIDS",label:"Kids"},
            {value:"PETS",label:"Pets"}
        ]
        return (
            <div className="GetCustomerCoupons">
                <CustomerMenu/> <br />
                <h2>MY COUPONS</h2>
                <Select className="Select" placeholder="CATEGORIES" onChange={this.handleCategory} options={options} />
                <br /> <br />
                <input type="number" placeholder="MAX PRICE" onChange={this.handleMaxPrice} /><br /> 
				{this.state.coupons != null?this.state.coupons.map((item)=>(
          <Card className="Card">
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <span> Id: {item.id} <br /></span>
                <span> Description: {item.description} <br /> </span>
                <span> End Date:{item.endDate}</span> <br />
                <span> Category: {item.category}</span>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button >
            <span> Price : {item.price}</span>
            </Button>
          </CardActions>
        </Card>
        )):<div></div>}
            </div>
        );
    }
}

export default CustomerCouponList;

