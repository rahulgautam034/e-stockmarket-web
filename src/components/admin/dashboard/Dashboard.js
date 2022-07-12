import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../../common/Loader";
import { createHttpHeader, url } from "../../services/HttpService";
import "./Dashboard.css";
import { DELETE_COMPANY_API, GET_ALL_COMPANIES_API } from "../../services/ApiService";
import { useNavigate } from "react-router";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [companies, updateArr] = useState([]);
  let [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (companies.length == 0 && count == 0) {
      getAllcompanies();
    }
  });

  const getAllcompanies = () => {
    setCount(1);
    setLoading(true);
    axios
      .get(url + GET_ALL_COMPANIES_API, createHttpHeader())
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        if(res && res.status == 200 && res.data && Array.isArray(res.data)){
          updateArr(res.data);
        }
        
      })
      .catch((err) => {
        console.log("errr", err);
        setLoading(false);
      });
  };

  const deleteCompany = (companyCode) => {
    let txt = "";
    if (window.confirm(`Are you sure you want to delete the company`)) {
      txt = "yes";
    } else {
      txt = "no";
    }

    if (txt === "no") {
      return;
    }
    setCount(1);
    setLoading(true);
    axios
      .delete(url + DELETE_COMPANY_API+companyCode, createHttpHeader())
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        if(res && res.status == 200 && res.data){
          alert(res.data)
          getAllcompanies();
        }
        
      })
      .catch((err) => {
        console.log("errr", err);
        setLoading(false);
      });
  };


  return (
    <div className="card manage_card col-12">
      {loading && (
        <div className="text-center loader">
          <Loader />
        </div>
      )}
      <div className="header">
        <h3>Stock Companies</h3>
      </div>
      <div id="manage_card_content">
        {Array.isArray(companies) && companies.length > 0 ? (
          companies.map((company) => (
            <div class="internal_card">
              <table class="table table-borderless">
                <thead class="thead-dark head">
                  <tr>
                    <th scope="col">Company Name</th>
                    <th scope="col">CEO</th>

                    <th scope="col">Company Code</th>
                    <th scope="col">Turnover</th>
                    <th scope="col">website</th>
                    <th scope ="col">stock price </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{company.companyName}</td>
                    <td>{company.companyCeo}</td>
                    <td>{company.companyCode}</td>
                    <td>{company.companyTurnover}</td>
                    <td>{company.companyWebsite}</td>
                    <td>{company?.stock[0]?.stockPrice || ""}</td>
                    
                    <td style ={{display: "flex"}}><button class="btn btn-outline-success m-1 my-sm-0 navbar_btn" type="submit" onClick={() => navigate("/company-stock",{state:{company:company}})}>Stock</button>
                    <button class="btn btn-outline-danger m-1 my-sm-0 navbar_btn " type="submit" onClick ={()=> deleteCompany(company.companyCode)}>
                    <i class="bi bi-trash3-fill"></i>
                    </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div className="no_data">
            <h3>No Data Available</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
