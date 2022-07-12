import {
  REQUEST_COMPANY,
} from "./company-actions";
import API from "./api";
import { RECEIVED_COMPANY_ACTION } from ".";
import { call } from "@redux-saga/core/effects";

function* fetchCompanies(action) {
  try{
    const response = yield call(API.fetchCompanies,action.searchValue);
    if (response.status == 200) {
      const payLoad = yield response.json();

      yield put(RECEIVED_COMPANY_ACTION(payLoad));

    } else if (response.status == 401) {
      yield put(RECEIVED_COMPANY_ACTION([]));
    }

  }catch(e){

  }

}

export function* watchCompany() {
  yield takeLatest(REQUEST_COMPANY,fetchCompanies);


}
