import customerData from '../../Models/customerData';

export class customerState{
    customers:customerData[];
}

export enum customerStateActionType{
    getCustomer="GetCustomer",
    addCustomer = "AddCustomer",
    updateCustomer = "updateCustomer" ,
    deleteCustomer = "deleteCustomer"
}

export interface customerAction{
    type:customerStateActionType
    payload?:any
}

export function addCustomerAction(customer:customerData):customerAction{
    return {type:customerStateActionType.addCustomer,payload:customer}
}
export function updateCustomerAction(customer:customerData):customerAction{
    return {type:customerStateActionType.updateCustomer,payload:customer}
}
export function deleteCustomerAction(id:string):customerAction{
    return {type:customerStateActionType.deleteCustomer,payload:id}
}
export function getCustomerAction(customers:customerData[]):customerAction{
    return {type:customerStateActionType.getCustomer,payload:customers}
}


export function customerReducer(currentState:customerState = new customerState(), action:customerAction):customerState{
    const newState = {...currentState};
    switch(action.type){
        case customerStateActionType.addCustomer: 
        newState.customers.push(action.payload)
        break;
        case customerStateActionType.deleteCustomer:
            const customers = newState.customers.filter(item =>{
                return item.customerId !== action.payload
            })
            console.log(customers)
            newState.customers= customers
        break;
        case customerStateActionType.getCustomer:
            newState.customers = action.payload;
        break;
        case customerStateActionType.updateCustomer:
        break;
    }
    return newState;
}

