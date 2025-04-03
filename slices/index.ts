import { combineReducers } from "redux";



// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import { Provider } from "react-redux";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import Contractors from "./contractors/reducer";
import Services from "./services/reducer";
import ServiceRequest from "./service-request/reducer"
import RealEstateRequest from "./real-estate/reducer"
import leadsReducers from "./leads/reducer"
import accountDeleteReducer from "./account-delete/reducer";
import  mainSearch from "./search/reducer";
import  profileDetial  from "../contract/utility/redux/profile";
import  proposalDetail  from "../contract/utility/redux/contract/reducer";

 "./search/reducer"
const rootReducer = combineReducers({
    Login: LoginReducer,
    Account: AccountReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    //contractor
    Contractors: Contractors,
    //Services
    Services: Services,
    ServiceRequest: ServiceRequest,
    RealEstate:RealEstateRequest,
    leads: leadsReducers,
    accountDelete:accountDeleteReducer,
    mainSearch:mainSearch,
    profile:profileDetial,
    proposal:proposalDetail
    

    
});

export default rootReducer;