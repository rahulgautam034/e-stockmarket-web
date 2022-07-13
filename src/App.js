import "./App.css";
import React, { useEffect } from "react";
import NavBar from "./common/NavBar";
import Router from "./routes/Router";
import { getTokenExpiry } from "./components/services/HttpService";
function App() {

  useEffect(() => {
    let tokenExpireDate = new Date(getTokenExpiry());
    console.log(tokenExpireDate < new Date())
    if(tokenExpireDate < new Date()) {
      localStorage.setItem("isUserAuthenticated", false);
    };
  })
  
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
          <Router />
      </header>
    </div>
  );
}

export default App;
