import React, { FC } from "react";

import { cn } from "@/lib/utils";
import DropdownIcon from "@/assets/icons/dropdown.svg";
import SearchIcon from "@/assets/icons/search.svg";

import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";

const deviceTypeOptions = [
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

export const DeviceListFilters: FC = () => {
  const [deviceTypes, setDeviceTypes] = React.useState<string[]>(["all"]);
  const [sortBy, setSortBy] = React.useState<(typeof sortByOptions)[number]["value"]>("hdd_capacity");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const getDisplayValue = (value: string, direction: "asc" | "desc") => {
    const option = sortByOptions.find((option) => option.value === value);
    const type = option?.label || "All";
    const directionText = direction === "asc" ? "(Ascending)" : "(Descending)";
    return `Sort by: ${type} ${directionText}`;
  };

  return (
    <section className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-2 w-full">
      <InputWithIcon icon={SearchIcon} alt="Search" placeholder="Search" type="text" className="w-full md:w-[270px]" />

      <MultiSelect
        options={deviceTypeOptions}
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
    </section>
  );
};
