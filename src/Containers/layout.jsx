import React from "react";
import Topheader from "../Components/header/Topheader";
import BtmHeader from "../Components/header/BtmHeader";
import { Outlet } from "react-router-dom";

import App from "../App";

export default function Layout() {
  //  using outlet
  return (
    <div className="bg-[#fff] w-screen min-h-screen inter">
      <header>
        <Topheader />
        <BtmHeader />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
