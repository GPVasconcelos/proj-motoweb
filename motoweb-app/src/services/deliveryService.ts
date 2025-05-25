import api from "../libs/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getMotoboyDeliveries() {
  const motoboyId = await AsyncStorage.getItem("motoboyId");
  const response = await api.get(`/motoboy/${motoboyId}/delivery`);
  return response.data;
}

export async function updateDeliveryStatus(deliveryId: number, status: string) {
  const motoboyId = await AsyncStorage.getItem("motoboyId");
  const response = await api.patch(
    `/motoboy/${motoboyId}/delivery/${deliveryId}/status`,
    {
      status,
    }
  );
  return response.data;
}

export async function getMotoboyDeliverySummary() {
  const motoboyId = await AsyncStorage.getItem("motoboyId");
  const response = await api.get(`/motoboy/${motoboyId}/deliveries`);
  return response.data;
}
