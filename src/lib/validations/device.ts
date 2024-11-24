import * as z from "zod";

export const deviceSchema = z.object({
  system_name: z.string().min(1, "System name is required"),
  type: z.enum(["WINDOWS", "LINUX", "MAC"], {
    errorMap: () => ({ message: "Device type is required" }),
  }),
  hdd_capacity: z.string().min(1, "HDD capacity is required").regex(/^\d+$/, "Must be a number"),
});

export type DeviceFormData = z.infer<typeof deviceSchema>;
