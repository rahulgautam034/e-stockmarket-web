import axios from "axios";
import { useEffect, useState } from "react";
import { GET_COMPANY_DETAIL_API } from "../../services/ApiService";
import { createHttpHeader, url } from "../../services/HttpService";
import { RECEIVED_COMPANY_ACTION } from "../../services/redux/company";
import { getDate, getTime } from "../../utils/util";

function CompanyDetailModal(props) {
  const [loading, updateLoging] = useState(false);
  const [company, updateObj] = useState({});
  const [count, setCount] = useState(0);


  const searchValue = props.searchValue;
  useEffect(() => {
    if (Object.keys(company).length == 0 && props.isModalOpen) {
      fetchCompany();
    }
  },);

  const fetchCompany = () => {
    setCount(1);
    updateLoging(true);
    axios
      .get(url + GET_COMPANY_DETAIL_API + searchValue, createHttpHeader())
      .then((res) => {
        console.log("res", res);
        updateLoging(false);
        if (res && res.status == 200 && res.data) {
          updateObj(res.data);
        }
      })
      .catch((err) => {
        console.log("errr", err);
        updateLoging(false);
      });
  };

  const updateData = ()=> {
    props.onReturn("")
    updateObj({})
  }
  return (
    <div
      className="modal fade"
      id={props.id}
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <i style ={{color:"green"}}className={`bi bi-circle-fill status_circle`}></i>
            <h5 className="modal-title" id="exampleModalToggleLabel">
              Name - {company?.companyName || ""}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row_div col-12">
              <div className="col-sm-3 div_col">
                <strong>Code</strong>

                <span>{company.companyCode || ""}</span>
              </div>
              <div className="col-sm-3 div_col">
                <strong>CEO</strong>
                <span>{company.companyCeo || ""}</span>
              </div>
              <div className="col-sm-3 div_col">
                <strong>Turnover</strong>
                <span>{company.companyTurnover || ""}</span>
              </div>

              <div className="col-sm-3 div_col">
                <strong>Website</strong>
                <span>{company.companyWebsite || ""}</span>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <h5>Stock</h5>
            <div className ="passenger_body" style={{overflow:"hidden"}}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Latest Stock Price</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  { Array.isArray(company?.stock) && company.stock.map(stock=>
                  <tr>
                    <td>{stock.stockPrice || ""}</td>
                    <td>{getDate(stock.createdDate)}</td>
                    <td>{getTime(stock.createdDate)}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              onClick ={()=> updateData({})}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailModal;
