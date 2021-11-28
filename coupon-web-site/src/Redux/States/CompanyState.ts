import companyData from '../../Models/companyData';

export class companyState{
    companies:companyData[]
}

export enum companyStateActionType{
    CompanyDownloaded="CompanyDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated" ,
    CompanyDeleted = "CompanyDeleted"
}

export interface companyAction{
    type:companyStateActionType;
    payload?:any;
}

export function addCompanyAction(company:companyData):companyAction{
    return {type:companyStateActionType.CompanyAdded,payload:company}
}
export function updateCompanyAction(company:companyData):companyAction{
    return {type:companyStateActionType.CompanyUpdated,payload:company}
}
export function deleteCompanyAction(id:string):companyAction{
    return {type:companyStateActionType.CompanyDeleted,payload:id}
}
export function getCompaniesAction(companies:companyData[]):companyAction{
    return {type:companyStateActionType.CompanyDownloaded,payload:companies}
}

export function companyReducer(currentState:companyState = new companyState(),action:companyAction):companyState{
    const newState = {...currentState}
    switch(action.type){
        case companyStateActionType.CompanyAdded:
            newState.companies.push(action.payload)
            break;
        case companyStateActionType.CompanyDeleted:
            const array = newState.companies.filter(item =>{
                return item.companyId !== action.payload
            })
            console.log(array)
            newState.companies= array
            break;
        case companyStateActionType.CompanyDownloaded:
            newState.companies = action.payload
            break;
        case companyStateActionType.CompanyUpdated:

            break;
    }
    return newState;
}



