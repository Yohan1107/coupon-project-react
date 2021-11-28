import { Component } from "react";
import customerData from "../../../../Models/customerData";
import jwtAxios from "../../../../Redux/JWT";
import notify from "../../../../Services/notify";
import "./CustomerList.css";
import image from "../../../../Assets/clientAvatar.jpeg";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";
import AdminMenu from "../../../LayoutArea/Menu/AdminMenu/AdminMenu";
import store from '../../../../Redux/Store';
import { deleteCustomerAction, getCustomerAction } from "../../../../Redux/States/CustomerState";



interface CustomerListState {
    customers: customerData[];
  }
  
  class CustomerList extends Component<{}, CustomerListState> {
    public constructor(props: {}) {
      super(props);
      this.state = {
        customers: store.getState().customerState.customers,
      };
    }
  
    public async componentDidMount() {
      const result = await jwtAxios.get<customerData[]>(
        "http://localhost:8080/admin/allCustomers"
      );
      const myResponse = result.data;
      this.setState({ customers: myResponse });
      store.dispatch(getCustomerAction(myResponse))
      console.log(myResponse);
    }
  
    private deleteData = async (id: string) => {
      try {
        await jwtAxios.delete("http://localhost:8080/admin/deleteCustomer" + id);
        store.dispatch(deleteCustomerAction(id))
        this.setState({
          customers:store.getState().customerState.customers
        })
        notify.success("Customer " + id + " was deleted");
      } catch (err){
        notify.error(err.response.data);
      }
    };
  
    public render(): JSX.Element {
      return (
        <div className="CustomerList">
          <AdminMenu/>
          <h2>CUSTOMERS</h2>
          {this.state.customers != null?this.state.customers.map((item)=>(
          <Card className="Card" key={item.customerId}> 
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
                  {item.firstName} {item.lastName} 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <span> Id: {item.customerId} <br /></span>
                  <span> Email: {item.email} <br /> </span>
                  <span>Password:{item.password}</span>
                </Typography>
              </CardContent>
            </CardActionArea>  
            <CardActions>
              <NavLink to = {{pathname : '/updateCustomer/'+item.customerId}}>
                  <Button size="small" color="primary">
                    UPDATE
                  </Button>
              </NavLink>
                <Button size="small" color="primary" onClick={() => this.deleteData(item.customerId)}>
                  DELETE
                </Button>
            </CardActions>
        </Card>
        )):<div></div>}
        </div>
      );
    }
  }
  
  export default CustomerList;
  