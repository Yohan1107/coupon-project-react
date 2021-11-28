import { Component } from "react";
import jwtAxios from "../../../../Redux/JWT";
import notify from "../../../../Services/notify";
import "./GetCompanyDetail.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import image from "../../../../Assets/clientAvatar.jpeg";
import CompanyMenu from "../../../LayoutArea/Menu/CompanyMenu/CompanyMenu";

interface GetCompanyDetailsState {
    companyId: string;
    companyEmail: string;
    companyName: string;
    companyPassword: string;
  }
  
  class GetCompanyDetails extends Component<{}, GetCompanyDetailsState> {
    public constructor(props: {}) {
      super(props);
      this.state = {
        companyId: "",
        companyName: "",
        companyEmail: "",
        companyPassword: "",
      };
    }
  
    async componentDidMount() {
      try {
        const result = await jwtAxios.get(
          "http://localhost:8080/company/CompanyDetails"
        );
        const myCompany = result.data;
        console.log(myCompany);
        this.setState({
          companyId: myCompany.companyId,
          companyName: myCompany.name,
          companyEmail: myCompany.email,
          companyPassword: myCompany.password,
        });
      } catch {
        notify.error("Something wrong...");
      }
    }
  
    public render(): JSX.Element {
      return (
        <div className="GetCompanyDetails">
          <CompanyMenu />
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
                  {this.state.companyName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <span>
                    {" "}
                    Id: {this.state.companyId} <br />
                  </span>
                  <span>
                    {" "}
                    Email: {this.state.companyEmail} <br />{" "}
                  </span>
                  <span>Password:{this.state.companyPassword}</span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      );
    }
  }
  
  export default GetCompanyDetails;
  
