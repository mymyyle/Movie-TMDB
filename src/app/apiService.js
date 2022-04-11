import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";

const apiService = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  params: {},
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

apiService.interceptors.request.use((config) => {
  // console.log(config);
  return config;
});

apiService.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      // console.log("ok.data", response.data);
      return response.data;
    }
    // console.log("ok", response);
    return response;
  },
  (err) => {
    // console.log(err);
    throw err;
  }
);

export default apiService;
