import React from "react";
import HeroSlider from "../Components/HeroSlider";
import SideProductes from "../Components/sideProductes/slideProductes";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <SideProductes title="Mobile" />
      <SideProductes title="Tablets" />
      <SideProductes title="Tv" />
      <SideProductes title="Ferniture" />
    </div>
  );
}
