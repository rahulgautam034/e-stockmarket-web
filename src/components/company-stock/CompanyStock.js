import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Loader from "../../common/Loader";
import {
  ADD_STOCK_API,
  GET_COMPANY_ALL_STOCK_API,
  GET_STOCK_BY_DATE_API,
} from "../services/ApiService";
import { createHttpHeader, url } from "../services/HttpService";
import { dayMonth, getDate, getTime } from "../utils/util";
import "./CompanyStock.css";
function CompanyStock() {
  const [loading, updateLoging] = useState(false);
  const [startDate, updateStartDate] = useState(null);
  const [endDate, updateEndDate] = useState(null);
  const [stock, updateStockArr] = useState([]);
  const [count, updateCount] = useState(0);
  const [stockObj, updateObj] = useState({});
  const [stockPrice,updateStock] = useState(0);

  const { state } = useLocation();
  const company = state?.company || {};

  useEffect(() => {
    if (stock.length == 0 && count == 0) {
      fetchAllStock();
    }
  });

  const setMinStartDate = () => {
    var today = new Date(startDate);
    var dd = dayMonth(today.getDate());
    var mm = dayMonth(today.getMonth() + 1); //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    console.log(yyyy + "-" + mm + "-" + dd);
    return yyyy + "-" + mm + "-" + dd;
  };

  const setMaxStartDate = () => {
    var today = new Date();
    var dd = dayMonth(today.getDate());
    var mm = dayMonth(today.getMonth() + 1); //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const fetchAllStock = () => {
    updateCount(1);
    updateLoging(true);
    axios
      .get(
        url + GET_COMPANY_ALL_STOCK_API + company.companyCode,
        createHttpHeader()
      )
      .then((res) => {
        console.log("res", res);
        updateLoging(false);
        if (res && res.status == 200 && Array.isArray(res.data)) {
          const _stock = res.data.sort(( a, b )=> {
            if ( a.createdDate < b.createdDate ){
              return 1;
            }
            if ( a.createdDate > b.createdDate ){
              return -1;
            }
            return 0;
          })

          updateStockArr(_stock);
          let max = 0,
            avg = 0,
            min = 0,
            total = 0;
          res.data.forEach((res) => {
            if (res.stockPrice > max || max == 0) {
              max = res.stockPrice;
            }
            if (res.stockPrice < min || min == 0) {
              min = res.stockPrice;
            }
            total += res.stockPrice;
          });
          if (total > 0) {
            avg = (total / res.data.length).toFixed(1);
          }
          updateObj({ max, min, avg });
        }
      })
      .catch((err) => {
        console.log("errr", err);
        updateLoging(false);
      });
  };

  const searchStock = () => {
    if (!startDate) {
      return alert("pick start date");
    } else if (!endDate) {
      return alert("pick end date");
    }
    let config = {
      ...createHttpHeader(),
      params: {
        companyCode: company.companyCode,
        startDate,
        endDate,
      },
    };
    updateLoging(true);
    axios
      .get(url + GET_STOCK_BY_DATE_API, config)
      .then((res) => {
        console.log("res", res);
        updateLoging(false);
        if (res && res.status == 200 && res.data) {
          updateStockArr(res.data);
          let max = 0,
            avg = 0,
            min = 0,
            total = 0;
          res.data.forEach((res) => {
            if (res.stockPrice > max || max == 0) {
              max = res.stockPrice;
            }
            if (res.stockPrice < min || min == 0) {
              min = res.stockPrice;
            }
            total += res.stockPrice;
          });
          avg = (total / res.data.length).toFixed(1);
          updateObj({ max, min, avg });
        }
      })
      .catch((err) => {
        console.log("errr", err);
        updateLoging(false);
      });
  };

  const addNewStock = (companyCode) => {
    if(stockPrice == 0) return alert("Please add stock value.")
    updateLoging(true)
    const stockObj = {
      companyCode,
      stockPrice
    }
    axios
      .post(url + ADD_STOCK_API, stockObj, createHttpHeader())
      .then((res) => {
        updateLoging(false)
        console.log("res", res);
        if (res.data && res.data.id) {
          alert("Stock updated successfully.");
          fetchAllStock()
          updateStock(0);
        }else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log("errrr", err);
        updateLoging(false)

      });
  }


  return (
    <div className="card manage_card col-12 cs_main_card">
      {loading && (
        <div className="text-center loader">
          <Loader />
        </div>
      )}
      <div className="header">
        <h3>{`${company.companyName || ""} stock`}</h3>
      </div>
      <div id="manage_card_content cs_card_content">
        <div class="row">
          <div class="col-3">
            <div class="m-4">
              <div class="card cs-card" style={{ width: "20vw" }}>
                <div class="card-body text-center">
                  <div className="side-card-internal">
                    <label class="card-title">Company Name</label>
                    <h6 class="card-title">{company.companyName}</h6>
                  </div>
                  <div className="side-card-internal">
                    <label class="card-title">Company Code</label>
                    <h6 class="card-title">{company.companyCode}</h6>
                  </div>
                  <div className="side-card-internal">
                    <label class="card-title">Start Date</label>
                    <input
                      max={setMaxStartDate()}
                      value={startDate}
                      type="date"
                      className="form-control"
                      placeholder="Start Date"
                      onChange={(e) => updateStartDate(e.target.value)}
                    />
                  </div>
                  <div className="side-card-internal">
                    <label class="card-title">End Date</label>
                    <input
                      value={endDate}
                      min={setMinStartDate()}
                      max={setMaxStartDate()}
                      type="date"
                      className="form-control"
                      placeholder="Start Date"
                      onChange={(e) => updateEndDate(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    onClick={() => searchStock()}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div
                class="card cs-card "
                style={{ width: "20vw", marginTop: 5 }}
              >
                <div class="card-body text-center">
                  <div className="side-card-internal">
                    <label class="card-title">Max :</label>
                    <h6 class="card-title">{stockObj.max || ""}</h6>
                  </div>
                  <div className="side-card-internal">
                    <label class="card-title">Avg :</label>
                    <h6 class="card-title">{stockObj.avg || ""}</h6>
                  </div>
                  <div className="side-card-internal">
                    <label class="card-title">Min :</label>
                    <h6 class="card-title">{stockObj.min || ""}</h6>
                  </div>
                </div>
              </div>

              <div
                class="card cs-card "
                style={{ width: "20vw", marginTop: 5 }}
              >
                <div class="card-body text-center">
                  <h4>Add Stock</h4>
                  <div className="col">
                    <label>
                      Stock Price <span className="mandatory_symbol">*</span>
                    </label>
                    <input
                      value={stockPrice}
                      type="number"
                      className="form-control aa-form-control"
                      placeholder="Name"
                      onChange={(e) =>
                        updateStock(e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn btn-outline-success cs-add-stock-btn"
                    type="submit"
                    onClick={() => addNewStock(company.companyCode)}
                  >
                    Add 
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-9 card_main">
            <div class="m-4">
              <div id="manage_card_content">
                {Array.isArray(stock) && stock.length > 0 ? (
                  stock.map((company) => (
                    <div class="internal_card">
                      <table class="table table-borderless">
                        <thead class="thead-dark head">
                          <tr>
                            <th scope="col">Company Name</th>

                            <th scope="col">Company Code</th>
                            <th scope="col">Price</th>
                            <th>Date</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{company.companyName}</td>
                            <td>{company.companyCode}</td>
                            <td>{company.stockPrice}</td>
                            <td>{getDate(company.createdDate)}</td>
                            <td>{getTime(company.createdDate)}</td>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyStock;
