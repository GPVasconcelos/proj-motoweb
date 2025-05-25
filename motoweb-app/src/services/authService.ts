import { api } from "../lib/api";

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginMotoboy(payload: LoginPayload) {
  const response = await api.post("/motoboy/login", payload);
  return response.data;
}

export async function loginAdmin(payload: LoginPayload) {
  const response = await api.post("/admin/login", payload);
  return response.data;
}

export async function loginCliente(payload: LoginPayload) {
  const response = await api.post("/cliente/login", payload);
  return response.data;
}
