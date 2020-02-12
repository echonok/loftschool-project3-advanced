import axios from "axios";

const baseUrl = "https://webdev-api.loftschool.com";
axios.defaults.baseURL = baseUrl;
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    const originRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data != "Передан не валидный токен"
    ) {
      return axios.post("/refreshToken").then(response => {
        const token = response.data.token;

        localStorage.setItem("token", token);
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        originRequest.headers["Authorization"] = `Bearer ${token}`;

        return axios(originRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
