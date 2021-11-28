import { Component } from "react";
import companyData from "../../../../Models/companyData";
import jwtAxios from "../../../../Redux/JWT";
import { deleteCompanyAction, getCompaniesAction } from "../../../../Redux/States/CompanyState";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/notify";
import "./CompanyList.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from "../../../../Assets/clientAvatar.jpeg";
import { NavLink} from "react-router-dom";
import AdminMenu from "../../../LayoutArea/Menu/AdminMenu/AdminMenu";


interface CompanyListState {
    companies: companyData[];
  }
  
  class CompanyList extends Component<{}, CompanyListState> {
    public constructor(props: {}) {
      super(props);
      this.state = {
        companies: store.getState().companyState.companies,
      };
    }
  
    public async componentDidMount(){
      const result = await jwtAxios.get("http://localhost:8080/admin/allCompanies");
      const myResponse = result.data;
      this.setState({
        companies: myResponse,
      });
      console.log(myResponse);
      store.dispatch(getCompaniesAction(myResponse))
      console.log(store.getState().companyState.companies);
    }
  
    private deleteData = async (id:string)=>{
      try{
          await jwtAxios.delete("http://localhost:8080/admin/deleteCompany" + id);
          store.dispatch(deleteCompanyAction(id))
          this.setState({
            companies: store.getState().companyState.companies,
          });
          notify.success("company was deleted")
      }catch(err){
          notify.error(err.response.data)
      }
  }
  
    public render(): JSX.Element {
      return (
        <div className="CompanyList">
          <AdminMenu/>
          <h1>Companies</h1>
          {this.state.companies != null?this.state.companies.map((item)=>(
            <Card key={item.companyId} className="Card">
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
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                 <span> Id: {item.companyId} <br /></span>
                  <span> Email: {item.email} <br /> </span>
                  <span>Password:{item.password}</span>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            <NavLink to = {{pathname : '/updateCompany/'+item.companyId}}>
                <Button size="small" color="primary">
                  UPDATE
                </Button>
            </NavLink>
              <Button size="small" color="primary" onClick={() => this.deleteData(item.companyId)}>
                DELETE
              </Button>
            </CardActions>
          </Card>
          )):<div></div>}
        </div>
      );
    }
  }
  
  export default CompanyList;