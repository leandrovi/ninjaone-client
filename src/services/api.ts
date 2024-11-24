import axios from "axios";
import { Device } from "@/types/device";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchDevices = async (): Promise<Device[]> => {
  const { data } = await api.get<Device[]>("/devices");
  return data;
};

export type CreateDevicePayload = Omit<Device, "id">;

export const createDevice = async (device: CreateDevicePayload): Promise<Device> => {
  const { data } = await api.post<Device>("/devices", device);
  return data;
};

export type UpdateDevicePayload = Omit<Device, "id">;

export const updateDevice = async (id: string, device: UpdateDevicePayload): Promise<Device> => {
  const { data } = await api.put<Device>(`/devices/${id}`, device);
  return data;
};

export const deleteDevice = async (id: string): Promise<string> => {
  await api.delete(`/devices/${id}`);
  return id;
};
