import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { deviceSchema, type DeviceFormData } from "@/lib/validations/device";
import { Device } from "@/types/device";
import { deviceTypeFormOptions } from "@/constants/device-types";

import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Button } from "@/components/ui/button/button";

interface DeviceFormProps {
  device?: Device;
  onSubmit: (values: DeviceFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export const DeviceForm = ({ device, onSubmit, onCancel, isSubmitting, error }: DeviceFormProps) => {
  const form = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      system_name: device?.system_name || "",
      type: device?.type || undefined,
      hdd_capacity: device?.hdd_capacity || "",
    },
  });

  function submit(values: DeviceFormData) {
    onSubmit(values);
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="system_name">System name *</Label>
        <Input id="system_name" {...form.register("system_name")} aria-invalid={!!form.formState.errors.system_name} />
        {form.formState.errors.system_name && (
          <p className="text-sm text-destructive">{form.formState.errors.system_name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="type">Device type *</Label>
        <Select
          name="type"
          defaultValue={device?.type}
          onValueChange={(value) => form.setValue("type", value as "WINDOWS" | "LINUX" | "MAC")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {deviceTypeFormOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {form.formState.errors.type && <p className="text-sm text-destructive">{form.formState.errors.type.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="hdd_capacity">HDD capacity (GB) *</Label>
        <Input
          id="hdd_capacity"
          {...form.register("hdd_capacity")}
          aria-invalid={!!form.formState.errors.hdd_capacity}
        />
        {form.formState.errors.hdd_capacity && (
          <p className="text-sm text-destructive">{form.formState.errors.hdd_capacity.message}</p>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="mt-2 flex justify-end gap-2 md:gap-1">
        <Button
          type="button"
          variant="outline"
          className="font-normal border-outline/25 !py-[11px] hover:border-outline/25 hover:bg-muted text-primary hover:text-primary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting} className="font-normal bg-primary hover:bg-primary/90">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};
