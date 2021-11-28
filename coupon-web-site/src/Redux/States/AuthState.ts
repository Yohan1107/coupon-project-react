import UserModel from "../../Models/userDetails";


export class AuthState{
    public user:UserModel = new UserModel();
    public constructor(){
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {this.user = storedUser}
    }
}

//auth action types
export enum AuthActionType{
    Register="Register",
    Login="Login",
    Logout = "Logout"
}

//auth action
export interface AuthAction{
    type:AuthActionType,
    payload? : any
}

//auth action creators
export function registerAction(user: UserModel):AuthAction{
    return {type: AuthActionType.Register, payload:user}
}

export function loginAction(user:UserModel):AuthAction{
    return {type:AuthActionType.Login, payload:user}
}

export function logoutAction():AuthAction{
    return {type: AuthActionType.Logout}
}

//auth reducer
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction):AuthState{
    const newState = {...currentState};
    switch(action.type){
        case AuthActionType.Login:
            newState.user = action.payload;
            localStorage.setItem("user",JSON.stringify(newState.user));
            break;
        case AuthActionType.Logout:
            newState.user = null;
            localStorage.removeItem("user")
            break;
    }
    return newState;
}