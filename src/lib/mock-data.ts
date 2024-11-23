export type Device = {
  id: string;
  system_name: string;
  type: "WINDOWS" | "LINUX" | "MAC";
  hdd_capacity: string;
};

export const mockDevices: Device[] = [
	{
		"id": "Th3ngERn9",
		"system_name": "DESKTOP-0VCBIFF",
		"type": "WINDOWS",
		"hdd_capacity": "128"
	},
	{
		"id": "Q1JdBnE12",
		"system_name": "LINUX-SMITH-J",
		"type": "LINUX",
		"hdd_capacity": "64"
	},
	{
		"id": "e7ocoQ2n3",
		"system_name": "WINXP-125498HQ",
		"type": "WINDOWS",
		"hdd_capacity": "64"
	},
	{
		"id": "Jj5bn3G2H",
		"system_name": "MAC-SMITH-JOHN",
		"type": "MAC",
		"hdd_capacity": "64"
	},
	{
		"id": "GT556QGnk",
		"system_name": "MAC-RODRIGUEZ-J",
		"type": "MAC",
		"hdd_capacity": "32"
	},
	{
		"id": "ppRmcE9p8",
		"system_name": "DESKTOP-0VCBIFF",
		"type": "LINUX",
		"hdd_capacity": "32"
	},
	{
		"id": "R5LdSnQhY",
		"system_name": "LINUX-SMITH-J",
		"type": "WINDOWS",
		"hdd_capacity": "32"
	},
	{
		"id": "ab1coL2n9",
		"system_name": "MAC-ADAMS-R",
		"type": "WINDOWS",
		"hdd_capacity": "32"
	},
];
