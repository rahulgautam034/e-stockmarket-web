import {
  REQUEST_COMPANY,
  RECEIVED_COMPANY,
} from "./company-actions";

const INITIAL_STATE = {
  isFetching: false,
  company: null,
  lastUpdated: null,
  searchValue:"",
  errorMessage: ""
};

export default function companyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_COMPANY:
      return {
        ...state,
        isFetching: true,
        errorMessage: ""
      };
    case RECEIVED_COMPANY:
      return {
        ...state,
        isFetching: false,
        company: "",
        searchValue:action.searchValue,
        lastUpdated: action.lastUpdated,
      };
      default:
        return state;
  }
}
