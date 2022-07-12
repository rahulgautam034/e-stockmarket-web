import "./AddCompany.css";
import axios from "axios";
import React from "react";
import { ADD_NEW_COMPANY, ADD_STOCK_API } from "../../services/ApiService";
import { createHttpHeader } from "../../services/HttpService";
import { url } from "../../services/HttpService";
import Loader from "../../../common/Loader";

export default class AddCompany extends React.PureComponent {
  state = {
    loading: false,
    file: {},
    companyName: "",
    companyCeo: "",
    companyTurnover: 0,
    companyWebsite: "",
    companyCode: "",
    stockPrice:0
  };

  clearValues() {
    this.setState({});
  }

  addCompany = () => {
    const {
      companyName,
      companyCeo,
      companyCode,
      companyTurnover,
      companyWebsite,
      stockPrice
    } = this.state;
    if (
      companyName.trim().length == 0 ||
      companyCeo.trim().length == 0 ||
      companyCode.trim().length == 0 ||
      companyTurnover == 0 ||
      companyWebsite.trim().length == 0 ||
      stockPrice == 0 
    ) {
      return alert("Please fill all * fields");
    }
    this.setState({ loading: true });

    const companyObj = {
      companyName,
      companyCeo,
      companyCode,
      companyTurnover,
      companyWebsite,
    };

    let config = createHttpHeader();
    axios
      .post(url + ADD_NEW_COMPANY, companyObj, config)
      .then((res) => {
        this.setState({ loading: false });
        console.log("res", res);
        if (res.data && res.data.id) {
          let stockObj = {
            companyCode,
            stockPrice
          }
          this.addStock(stockObj)
          this.clearValues();
        }else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log("errrr", err);
        this.setState({ loading: false });
      });
  };

  addStock = (stockObj) => {

    axios
      .post(url + ADD_STOCK_API, stockObj, createHttpHeader())
      .then((res) => {
        this.setState({ loading: false });
        console.log("res", res);
        if (res.data && res.data.id) {
          alert("Company added successfully.");
          this.clearValues();
        }else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log("errrr", err);
        this.setState({ loading: false });
      });
  }



  onFileChange = (e) => {
    const image = e.target.files[0];
    this.setState({ file: image });
  };

  render() {
    let {
      companyName,
      companyCeo,
      companyCode,
      companyTurnover,
      companyWebsite,
      stockPrice
    } = this.state;
    return (
      <div className="card col-12" id="card_main">
        {this.state.loading && (
          <div className="text-center loader">
            <Loader />
          </div>
        )}
        <div className="header">
          <h3>Add Company</h3>
          <div className="d-grid gap-2 col-2 ">
            <button
              className="btn btn-secondary col-10"
              type="button"
              onClick={() => this.addCompany()}
            >
              Add New Company
            </button>
          </div>
        </div>
        <div id="card_content" className="col-12">
          <form className="form">
            <div className="form-row form_main">
              <div className="col">
                <label>
                  Name <span className="mandatory_symbol">*</span>
                </label>
                <input
                  value={companyName}
                  type="text"
                  className="form-control aa-form-control"
                  placeholder="Name"
                  onChange={(e) =>
                    this.setState({ companyName: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <label>
                  Code <span className="mandatory_symbol">*</span>
                </label>
                <input
                  value={companyCode}
                  type="text"
                  className="form-control aa-form-control"
                  placeholder="code"
                  onChange={(e) =>
                    this.setState({ companyCode: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-row form_main">
              <div className="col">
                <label>
                  website <span className="mandatory_symbol">*</span>
                </label>
                <input
                  value={companyWebsite}
                  type="text"
                  className="form-control aa-form-control"
                  placeholder="website"
                  onChange={(e) =>
                    this.setState({ companyWebsite: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <label>
                  Turover <span className="mandatory_symbol">*</span>
                </label>
                <input
                  value={companyTurnover}
                  type="number"
                  className="form-control aa-form-control"
                  placeholder="turnover"
                  onChange={(e) =>
                    this.setState({ companyTurnover: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-row form_main">
              <div className="col">
                <label>
                  Ceo <span className="mandatory_symbol">*</span>
                </label>
                <input
                  value={companyCeo}
                  type="text"
                  className="form-control aa-form-control"
                  placeholder="ceo"
                  onChange={(e) =>
                    this.setState({ companyCeo: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <label>
                  Stock price <span className="mandatory_symbol">*</span>
                </label>
                <input
                  value={stockPrice}
                  type="number"
                  className="form-control aa-form-control"
                  placeholder="ceo"
                  onChange={(e) =>
                    this.setState({ stockPrice: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col"></div>
          </form>
        </div>
      </div>
    );
  }
}
