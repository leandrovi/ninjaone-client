import * as React from "react";

import Logo from "@/assets/logo.svg";

export const Header: React.FC = () => {
  return (
    <header className="bg-accent-foreground text-white px-6 py-3">
      <img src={Logo} alt="NinjaOne" className="w-[120px] object-contain" />
    </header>
  );
};
