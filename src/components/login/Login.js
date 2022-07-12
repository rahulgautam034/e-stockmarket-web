import axios from "axios";
import { useEffect, useState } from "react";
import { setToken, url } from "../services/HttpService";
import "./Login.css";
import logo from "../../assests/logo.png";
import { useNavigate } from "react-router-dom";
import { getUser, getUserDetails } from "../services/AccountService";
import Loader from "../../common/Loader";
import {
  LOGIN_API,
  USER_SIGNUP_API,
} from "../services/ApiService";
import SignUpModal from "../sign-up/SignUpModal";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [userRole, setUserRole] = useState();
  const userRoles = ["ADMIN", "USER"];
  const navigate = useNavigate();

  const navigteTo = () => {
    const user = getUserDetails();
    let isUserAuthenticated = localStorage.getItem("isUserAuthenticated");
    console.log(isUserAuthenticated);
    navigate("/");
    window.location.reload();
  };

  const signUp = (data) => {
    setLoading(true);
    axios
      .post(url + USER_SIGNUP_API, data)
      .then((res) => {
        console.log("res", res.data);
        if (res.status == 200 && res.data) {
          alert("User created Successfully.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        alert("Inavalid Credentials");
      });
  };

  const login = () => {
    if (userName.trim().length == 0) {
      return alert("Please enter user name");
    } else if (password.trim().length == 0) {
      return alert("Please enter password");
    }
    setLoading(true);
    const credentials = {
      username: userName,
      password,
    };

    axios
      .post(url + LOGIN_API, credentials)
      .then((res) => {
        console.log("res", res.data);
        if (res.status == 200 && res.data) {
          setToken(res.data.token);
          getUser({
            userName: userName,
            role: userRole,
            callBack: (res) => {
              console.log("resssss", res);
                setLoading(false)

              if (res == "success") {
                navigteTo();
              }
            },
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        alert("Inavalid Credentials");
      });
  };
  return (
    <div>
      <SignUpModal
        id="signupModal"
        toggle="modal"
        onSubmit={(data) => signUp(data)}
      />
      <div className="card col-12">
        <div className="header">
          <h2>Login</h2>
        </div>
        {loading && (
          <div className="text-center loader">
            <Loader />
          </div>
        )}
        <div className="card block">
          <div className="card-body">
            <img src={logo} alt="logo" />
            <div className="input_area">
              <div className="login_control">
                <label>User Name</label>
                <input
                  value={userName}
                  placeholder="User Name"
                  type="text"
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
            </div>
            <div className="input_area">
              <div className="login_control">
                <label>Password</label>
                <input
                  value={password}
                  placeholder="Password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
              <button
                class="btn btn-secondary "
                type="button"
                onClick={() => login()}
              >
                Login
              </button>
            </div>
            {userRole == "USER" && (
              <>
                <div class="d-grid gap-2 col-6 mx-auto">
                  <span>OR</span>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                  <button
                    class="btn btn-primary "
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                    // onClick={() => login()}
                  >
                    Sign up
                  </button>
                </div>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
