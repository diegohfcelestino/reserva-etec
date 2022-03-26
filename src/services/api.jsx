import axios from "axios";

const api = axios.create({
  headers: {
    accept: "*/*",
    "Content-Type": "application/json-patch+json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
