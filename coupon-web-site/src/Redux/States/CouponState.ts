
import couponData from '../../Models/couponData';

export class couponState{
    coupons:couponData[];
}

export enum couponStateActionType{
    getCoupons="CouponDownloaded",
    addCoupon = "CouponAdded",
    updateCoupon = "CouponUpdated" ,
    deleteCoupon = "CouponDeleted"
}

export interface couponAction{
    type:couponStateActionType;
    payload:any
}

export function addCouponAction(coupons:couponData):couponAction{
    return {type:couponStateActionType.addCoupon,payload:coupons}
}
export function updateCouponAction(coupons:couponData[]):couponAction{
    return {type:couponStateActionType.updateCoupon,payload:coupons}
}
export function deleteCouponAction(id:string):couponAction{
    return {type:couponStateActionType.deleteCoupon,payload:id}
}
export function getCouponAction(coupons:couponData[]):couponAction{
    return {type:couponStateActionType.getCoupons,payload:coupons}
}


export function couponReducer(currentState:couponState = new couponState(),action:couponAction):couponState{
    const newState = {...currentState};
    switch(action.type){
        case couponStateActionType.addCoupon:
            newState.coupons.push(action.payload)
            break;
        case couponStateActionType.deleteCoupon:
            const coupons = newState.coupons.filter(item =>{
                return item.id !== action.payload
            })
            console.log(coupons)
            newState.coupons= coupons
            break;
        case couponStateActionType.getCoupons:
            newState.coupons = action.payload
            break;
        case couponStateActionType.updateCoupon:
            break;

    }
    return newState
}

