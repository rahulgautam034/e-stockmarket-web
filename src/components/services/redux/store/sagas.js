import { all } from "redux-saga/effects";
import { watchCompany } from "../company/company-saga";

export default function* rootSaga() {
  yield all([
    watchCompany()
  ]);
}
