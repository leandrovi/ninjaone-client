export const deviceTypes = {
  WINDOWS: "WINDOWS",
  LINUX: "LINUX",
  MAC: "MAC",
} as const;

export const deviceTypeOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Windows",
    value: "WINDOWS",
  },
  {
    label: "Linux",
    value: "LINUX",
  },
  {
    label: "Mac",
    value: "MAC",
  },
];
