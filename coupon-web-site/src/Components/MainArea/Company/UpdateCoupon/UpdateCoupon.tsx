import { Component, SyntheticEvent } from "react";
import "./UpdateCoupon.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from "react-select";
import jwtAxios from "../../../../Redux/JWT";
import couponData from "../../../../Models/couponData";
import notify from "../../../../Services/notify";
import CompanyMenu from "../../../LayoutArea/Menu/CompanyMenu/CompanyMenu";

interface UpdateCouponState {
    id:string;
    companyId:string;
    category: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    amount: string;
    price: string;
    image: string;
}

interface UpdateCouponProps{
    updateCouponId:string;
}

class UpdateCoupon extends Component<UpdateCouponProps, UpdateCouponState> {

    public constructor(props: UpdateCouponProps) {
        super(props);
        this.state = {
            id:this.props.updateCouponId,
            companyId:"",
            category:"",
            title:"",
            description:"",
            startDate:"",
            endDate:"",
            amount:"",
            price:"",
            image:""
        };
    }
    handleCategory = (option:any)=>{
        this.setState({
            category: option.value
        })
    }  

    private setTitle = (args:SyntheticEvent)=>{
        const value= (args.target as HTMLInputElement).value;
        this.setState({
            title:value
        });
    }
    private setDescription = (args:SyntheticEvent)=>{
        const value= (args.target as HTMLInputElement).value;
        this.setState({
            description:value
        });
    }
    private setStartDate = (args:SyntheticEvent)=>{
        const value= (args.target as HTMLInputElement).value;
        this.setState({
            startDate:value
        });
    }
    private setEndDate = (args:SyntheticEvent)=>{
        const value= (args.target as HTMLInputElement).value;
        this.setState({
            endDate:value
        });
    }
    private setAmount = (args:SyntheticEvent)=>{
        const value= (args.target as HTMLInputElement).value;
        this.setState({
            amount:value
        });
    }
    private setPrice = (args:SyntheticEvent)=>{
        const value= (args.target as HTMLInputElement).value;
        this.setState({
            price:value
        });
    }
    private setImage = (args:SyntheticEvent)=>{
        const value= (args.target as HTMLInputElement).value;
        this.setState({
            image:value
        });
    }
    
    async componentDidMount(){
        const result = await jwtAxios.get("http://localhost:8080/company/getOneCoupon/" + this.props.updateCouponId);
        const myResult = result.data;
        this.setState({
            id:myResult.id,
            companyId:myResult.companyId, 
            category:myResult.category,
            title:myResult.title,
            description:myResult.description,
            startDate:myResult.startDate,
            endDate:myResult.endDate,
            amount:myResult.amount,
            price:myResult.price,
            image:myResult.image
        })
    }


    private updateData = async()=>{
        const coupon = new couponData();
            coupon.companyId=this.state.companyId;
            coupon.id=this.state.id;
            coupon.category=this.state.category;
            coupon.title=this.state.title;
            coupon.description=this.state.description;
            coupon.startDate=this.state.startDate;
            coupon.endDate=this.state.endDate;
            coupon.amount=this.state.amount;
            coupon.price=this.state.price;
            coupon.image=this.state.image;
            await jwtAxios.put("http://localhost:8080/company/updateCoupon", coupon);
            notify.success("Coupon was updated successfully")
    }

    public render(): JSX.Element {
        console.log("coupon number" + this.props.updateCouponId)
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
        <div className="UpdateCoupon">
            <CompanyMenu/>
                <div className="AddBox">
				<h3>Update coupon</h3>
                <TextField className="textField" value={this.state.title} onChange={this.setTitle} variant="filled"  label="title"  /> <span>  </span> 
                    <TextField  variant="filled" value={this.state.description} onChange={this.setDescription} label="description"  /> <br /> <br />
                    <TextField  variant="filled" value={this.state.amount}onChange={this.setAmount} label="amount" /> <span>  </span> 
                    <TextField  variant="filled" value={this.state.price}onChange={this.setPrice} label="price"  /> <br /> <br />
                    <Select className="categorySelect" defaultInputValue={this.state.category} onChange={this.handleCategory} options={options} placeholder="CATEGORY" /> <br /> <br />
                    <TextField  label="startDate" value={this.state.startDate} onChange={this.setStartDate} type="date"  defaultValue="2021-07-26" />  <br /> <br />                 
                    <TextField  label="endDate" value={this.state.endDate} onChange={this.setEndDate} type="date"  defaultValue="2021-07-26"/>    <br />  <br />
                    <TextField  variant="filled" value={this.state.image} onChange={this.setImage} name="image" label="image"/> <br /> <br />
                    <Button onClick={this.updateData} variant="contained">Submit</Button>  
            </div>
        </div>
        );
    }
}

export default UpdateCoupon;
