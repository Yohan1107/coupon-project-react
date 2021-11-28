import { Component, SyntheticEvent } from "react";
import couponData from "../../../../Models/couponData";
import jwtAxios from "../../../../Redux/JWT";
import notify from "../../../../Services/notify";
import "./CompanyCouponList.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from "../../../../Assets/CouponImage.jpeg"
import { NavLink } from "react-router-dom";
import store from "../../../../Redux/Store";
import Select from "react-select";
import { deleteCouponAction, getCouponAction } from '../../../../Redux/States/CouponState';

interface CompanyCouponListState {
    coupons:couponData[];
}

class CompanyCouponList extends Component<{}, CompanyCouponListState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
			coupons:store.getState().couponState.coupons
        };
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

    public async componentDidMount(){
        const result = await jwtAxios.get("http://localhost:8080/company/companyCoupons")
        const myResponse = result.data;
        this.setState({
            coupons:myResponse
        });
        store.dispatch(getCouponAction(myResponse));
        console.log(myResponse);
    }
    private deleteData = async (id:string) => {
      try {
        await jwtAxios.delete("http://localhost:8080/company/deleteCoupon" + id);
        store.dispatch(deleteCouponAction(id))
        notify.success("Coupon was deleted")
        this.setState({
          coupons: store.getState().couponState.coupons
        })
      } catch {
          notify.error("ERROR! Coupon was not deleted")
      }
    };

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
            <div className="GetAllCoupons">
          <Select className="Select" placeholder="CATEGORIES" onChange={this.handleCategory} options={options} />
          <br /> <br />
          <input type="number" placeholder="MAX PRICE" onChange={this.handleMaxPrice} /><br /> 
                {this.state.coupons != null?this.state.coupons.map((item)=>(
          <Card key={item.id} className="Card">
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
                <span> End Date: {item.endDate} <br /></span> 
                <span> Amount: {item.amount}</span>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
          <NavLink to = {{pathname : '/updateCoupon/'+item.id}}>
              <Button size="small" color="primary">
                UPDATE
              </Button>
          </NavLink>
            <Button size="small" color="primary" onClick={() => this.deleteData(item.id)}>
              DELETE 
                </Button>
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

export default CompanyCouponList;

