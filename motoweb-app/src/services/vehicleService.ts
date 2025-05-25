import api from "../libs/api";

type VehiclePayload = {
  model: string;
  color: string;
  type: string;
  year: number;
  plate: string;
  renavam: string;
};

export const getVehicles = async (motoboyId: string) => {
  const res = await api.get(`/motoboy/${motoboyId}/vehicles`);
  return res.data;
};

export const createVehicle = async (
  motoboyId: string,
  data: VehiclePayload
) => {
  await api.post(`/motoboy/${motoboyId}/vehicles`, data);
};

export const updateVehicle = async (
  motoboyId: string,
  vehicleId: number,
  data: VehiclePayload
) => {
  await api.patch(`/motoboy/${motoboyId}/vehicles/${vehicleId}`, data);
};

export const deleteVehicle = async (motoboyId: string, vehicleId: number) => {
  await api.delete(`/motoboy/${motoboyId}/vehicles/${vehicleId}`);
};
