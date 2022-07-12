import { combineReducers } from "redux";
import companyReducer from "../company/company-reducer";

const appReducer = combineReducers({
  companyState:companyReducer

});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
