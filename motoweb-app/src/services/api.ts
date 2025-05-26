import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.20:3000", // Troque pelo IP da sua máquina na rede
});

export default api;
