import axios from "axios";
import { Device } from "@/types/device";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchDevices = async (): Promise<Device[]> => {
  const { data } = await api.get<Device[]>("/devices");
  return data;
};
