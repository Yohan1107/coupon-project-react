import { Component } from "react";
import "./GetCustomerDetails.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import image from "../../../../Assets/clientAvatar.jpeg";
import CustomerMenu from '../../../LayoutArea/Menu/CustomerMenu/CustomerMenu';
import jwtAxios from '../../../../Redux/JWT';

interface GetCustomerDetailState {
	customerId:string;
    customerFirstName:string;
    customerLastName:string;
    customerEmail:string;
    customerPassword:string;
}

class GetCustomerDetail extends Component<{}, GetCustomerDetailState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
			customerId:"",
            customerFirstName:"",
            customerLastName:"",
            customerEmail:"",
            customerPassword:""
        };
    }

    async componentDidMount(){
        const result = await jwtAxios.get("http://localhost:8080/customer/customerDetails")
        const myCustomer = result.data;
        console.log(myCustomer)
        this.setState({
            customerId:myCustomer.customerId,
            customerFirstName:myCustomer.firstName,
            customerLastName:myCustomer.lastName,
            customerEmail:myCustomer.email,
            customerPassword:myCustomer.password
        })
    }

    public render(): JSX.Element {
        return (
            <div className="GetCustomerDetail">
          <CustomerMenu />
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
                  {this.state.customerFirstName} {this.state.customerLastName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <span>
                    {" "}
                    Id: {this.state.customerId} <br />
                  </span>
                  <span>
                    {" "}
                    Email: {this.state.customerEmail} <br />{" "}
                  </span>
                  <span>Password:{this.state.customerPassword}</span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
            </div>
        );
    }
}

export default GetCustomerDetail;
