import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import { getUserDetails } from "../components/services/AccountService";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import CompanyDetailModal from "../components/admin/company-detail/CompanyDetailModal";
import axios from "axios";
import { createHttpHeader, url } from "../components/services/HttpService";
import { GET_COMPANY_DETAIL_API } from "../components/services/ApiService";
function NavBar() {
  
  const navigate = useNavigate();
  const [arr, setArr] = useState([]);
  const [isUserLoggedIn, updateUSer] = useState(false);
  const [user, setUserDetails] = useState({});
  const [searchValue, updateSearch] = useState("");
  const [isModalOpen, updateModal] = useState(false);
  const [company, updateObj] = useState({});
  const [loading, updateLoging] = useState(false);

  const state = useSelector((state) => {
    return { ...state };
  });
  // Reducer props
  const dispatch = useDispatch(null);
  

  const navigateTo = (item) => {
    navigate(item.path);
  };

  const logout = () => {
    let txt = "";
    if (window.confirm(`Are you sure you want to Logout`)) {
      txt = "yes";
    } else {
      txt = "no";
    }

    if (txt === "no") {
      return;
    }

    localStorage.removeItem("account");
    localStorage.setItem("isUserAuthenticated", false);
    localStorage.removeItem("token");
    updateUSer(false);
    navigate("/");
    window.location.reload();
  };

  const searchCompany = () => {
    if (searchValue.trim().length == 0)
      return alert("please enter company code ");
      fetchCompany()
   
  };

  const fetchCompany = () => {
    updateLoging(true);
    axios
      .get(url + GET_COMPANY_DETAIL_API + searchValue, createHttpHeader())
      .then((res) => {
        console.log("res", res);
        updateLoging(false);
        if (res && res.status == 200 && res.data && !res.data.message) {
          updateObj(res.data);
          updateModal(true)
        }else {
          updateSearch("");
          return alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("errr", err);
        updateLoging(false);
      });
  };


  useEffect(() => {
    const newArr = JSON.parse(localStorage.getItem("navBarArr"));
    const isUser = localStorage.getItem("isUserAuthenticated");
    const user = getUserDetails();

    if (user && arr.length !== newArr.length) {
      setArr(newArr);
      updateUSer(isUser);
      setUserDetails(user);
    }
  });

  const updateStateObj = () => {
    updateSearch("")
    updateModal(false)
  }

  return (
    
    <>
      <CompanyDetailModal
        id="exampleModal"
        toggle="modal"
        company ={company}
        dispatch={dispatch}
        onReturn = {()=> updateStateObj()}
      />
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{
          height: "4rem",
          position: "fixed",
          width: "100%",
          overflow: "hidden",
          top: "0",
          zIndex: "1",
        }}
      >
        <div className="container-fluid">
          <img
            onClick={() =>
                navigate("/")
            }
            src={logo}
            style={{
              height: "2.5rem",
              display: "block",
              width: "5rem",
              cursor: "pointer",
            }}
            href="#"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {arr && isUserLoggedIn == "true" &&
              arr.map((item, i) => (
                <div key={i}>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={() => navigateTo(item)}
                      >
                        {item.title}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
          </div>

          {isUserLoggedIn =="true" && (
            <>
              <input
                value={searchValue}
                class="form-control mr-sm-2"
                type="search"
                placeholder="company code"
                style={{ width: "18%", margin: "15px" }}
                onChange={(e) => updateSearch(e.target.value)}
              />
              <button
                data-bs-toggle="modal"
                data-bs-target={isModalOpen ? "#exampleModal" : "#a"}
                className="btn btn-outline-success btn-lg btn-block custom"
                type="submit"
                onClick={() => searchCompany()}
              >
                Search
              </button>
              <button
                className="btn btn-outline-success btn-lg btn-block custom"
                type="submit"
                onClick={() => logout()}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
export default NavBar;
