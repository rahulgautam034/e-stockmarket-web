import axios from "axios"
import { adminNavBar } from "../navbar-items/navbar-items"
import {  USER_ACCOUNT } from "./ApiService"
import { createHttpHeader, url } from "./HttpService"

export const getUser = (request) => {

    axios.get(url+USER_ACCOUNT +request.userName,createHttpHeader())
    .then(res=> {
        if(res && res.data) {
            localStorage.setItem("account",JSON.stringify(res.data))
            localStorage.setItem("isUserAuthenticated",true)
                localStorage.setItem("navBarArr",JSON.stringify(adminNavBar))
            request.callBack("success")
        }

    }).catch(err=> {
        console.log(err)
        request.callBack("error")
    })
}

export const getUserDetails=()=>{
    return JSON.parse(localStorage.getItem("account"));
}

export const isUserAuthenticated=()=>{
    return JSON.parse(localStorage.getItem("isUserAuthenticated"));
}