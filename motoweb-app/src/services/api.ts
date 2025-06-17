import axios from "axios";

const api = axios.create({
  baseURL: "https://motoweb-api-production.up.railway.app", // Troque pelo IP da sua máquina na rede
});

export default api;