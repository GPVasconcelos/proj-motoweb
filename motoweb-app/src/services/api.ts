import axios from "axios";

const api = axios.create({
  baseURL: "https://motoweb-api-production.up.railway.app",
});

export default api;
