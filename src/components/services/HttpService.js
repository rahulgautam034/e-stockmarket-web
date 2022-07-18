export const url = "http://localhost:8082/";

export const setToken = (token) => {
  const obj = JSON.stringify(token)
  localStorage.setItem("token", obj);
  localStorage.setItem("isUserAuthenticated", true);
};

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("token"))
  return JSON.parse(localStorage.getItem("token")).token;
};

export const getTokenExpiry =()=> {
  const token = JSON.parse(localStorage.getItem("token"))
  return token && token.expiration ? token.expiration : null;
}



export const createHttpHeader = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  };
  return config;
};
