import { Component } from "react";
import couponData from "../../../../Models/couponData";
import jwtAxios from "../../../../Redux/JWT";
import notify from "../../../../Services/notify";
import "./PurchaseCoupon.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from "../../../../Assets/CouponImage.jpeg"

interface PurchaseCouponState {
    coupons:couponData[]
}
 
class PurchaseCoupon extends Component<{}, PurchaseCouponState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      coupons:[]
    };
  }
 
  public async componentDidMount() {
    const result = await jwtAxios.get("http://localhost:8080/customer/allCoupons")
    const coupons = result.data;
    this.setState({
      coupons:coupons
    })
  }
 
  public postData = async(coupon:couponData)=>{
     try{
       console.log(coupon)
        await jwtAxios.post("http://localhost:8080/customer/purchaseCoupon",coupon)
        notify.success("Coupon purchased successfully")
     }catch(err){
       notify.error(err.response.data)
     }
  }
 
  public render(): JSX.Element {
     
    return (
      <div className="PurchaseCoupon">
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
                <span> End Date:{item.endDate}</span>
                <span>Amount:{item.amount}</span>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button >
            <span> Price : {item.price}</span>
            </Button>
            <Button onClick={()=>{this.postData(item)}}>
            PURCHASE
            </Button>
          </CardActions>
        </Card>
        )):<div></div>}
      </div>
    );
  }
}
 
export default PurchaseCoupon;
 