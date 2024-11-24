export type Device = {
  id: string;
  system_name: string;
  type: "WINDOWS" | "LINUX" | "MAC";
  hdd_capacity: string;
};
