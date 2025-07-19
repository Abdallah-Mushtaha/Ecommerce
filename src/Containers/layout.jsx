import Topheader from "../Components/header/Topheader";
import BtmHeader from "../Components/header/BtmHeader";
import { Outlet } from "react-router-dom";

import App from "../App";
import Footer from "../Components/Footer";

export default function Layout() {
  //  using outlet
  return (
    <div className="bg-[#fff] w-screen min-h-screen inter ">
      <header className="fixed top-0 left-0 right-0 bg-white z-[100] ">
        <Topheader />
        <BtmHeader />
      </header>

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
