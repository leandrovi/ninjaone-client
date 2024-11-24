import * as React from "react";

import DropdownIcon from "@/assets/icons/dropdown.svg";
import SearchIcon from "@/assets/icons/search.svg";
import SyncIcon from "@/assets/icons/sync.svg";

import { cn } from "@/lib/utils";
import { deviceTypeFilterOptions } from "@/constants/device-types";
import { useDevicesContext } from "@/context/devices-context";

import { InputWithIcon } from "@/components/ui/input-with-icon/input-with-icon";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/popover";
import { Button } from "@/components/ui/button/button";
import { MultiSelect } from "@/components/ui/multi-select/multi-select";

const sortByOptions = [
  {
    label: "HDD Capacity",
    value: "hdd_capacity",
  },
  {
    label: "Type",
    value: "type",
  },
  {
    label: "System Name",
    value: "system_name",
  },
];

export const DeviceListFilters: React.FC = () => {
  const {
    deviceTypes,
    setDeviceTypes,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    search,
    setSearch,
    refetch,
  } = useDevicesContext();

  const getDisplayValue = (value: string, direction: "asc" | "desc") => {
    const option = sortByOptions.find((option) => option.value === value);
    const type = option?.label || "All";
    const directionText = direction === "asc" ? "(Ascending)" : "(Descending)";
    return `Sort by: ${type} ${directionText}`;
  };

  const handleSync = () => {
    setDeviceTypes(["all"]);
    setSortBy("system_name");
    setSortDirection("asc");
    setSearch("");
    refetch();
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row items-start lg:items-center lg:justify-between w-full">
      <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-2 w-full">
        <InputWithIcon
          icon={SearchIcon}
          alt="Search"
          placeholder="Search"
          type="text"
          className="w-full lg:w-[270px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <MultiSelect
          options={deviceTypeFilterOptions}
          onValueChange={setDeviceTypes}
          defaultValue={deviceTypes}
          placeholder="Select device types"
          variant="inverted"
          maxCount={1}
          className="w-full md:w-[calc(50%-0.25rem)] lg:w-[270px]"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[calc(50%-0.25rem)] lg:w-[300px] capitalize justify-between hover:bg-transparent font-light border border-border py-2 pl-3 pr-2 text-sm"
            >
              <div className="flex items-center justify-between w-full">
                {getDisplayValue(sortBy, sortDirection)}
                <img src={DropdownIcon} alt="Dropdown" className="w-3 cursor-pointer text-muted-foreground ml-2" />
              </div>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full md:w-[270px] p-0 font-light rounded-sm">
            <div className="flex flex-col">
              <div className="flex flex-col p-1">
                {sortByOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    className={`font-normal justify-start capitalize ${sortBy === option.value ? "bg-muted" : ""}`}
                    onClick={() => setSortBy(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <div className="border-t border-border flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("font-normal w-full py-5 rounded-none", sortDirection === "asc" ? "bg-muted" : "")}
                  onClick={() => setSortDirection("asc")}
                >
                  ASC
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("font-normal w-full py-5 rounded-none", sortDirection === "desc" ? "bg-muted" : "")}
                  onClick={() => setSortDirection("desc")}
                >
                  DESC
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Button variant="ghost" onClick={handleSync} className="mb-2 lg:mb-0 p-2 self-end lg:self-center">
        <img src={SyncIcon} alt="Sync" />
      </Button>
    </section>
  );
};
