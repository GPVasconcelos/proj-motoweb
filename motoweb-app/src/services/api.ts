import axios from "axios";

const api = axios.create({
  baseURL: "http://10.118.2.60:3000", // Troque pelo IP da sua máquina na rede
});

export default api;
