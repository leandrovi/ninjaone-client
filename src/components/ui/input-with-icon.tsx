import React from "react";

import { Input } from "./input";
import { cn } from "@/lib/utils";

type InputWithIconProps = React.ComponentProps<"input"> & {
  icon: string;
  alt: string;
};

export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, alt, className, ...props }, ref) => {
    return (
      <div className="relative w-full lg:w-fit">
        <img src={icon} alt={alt} className="absolute left-[17px] top-1/2 -translate-y-1/2 w-[15px]" />
        <Input ref={ref} className={cn("pl-10", className)} {...props} />
      </div>
    );
  },
);

InputWithIcon.displayName = "InputWithIcon";
