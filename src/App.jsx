import BtmHeader from "./Components/header/BtmHeader";
import Topheader from "./Components/header/Topheader";
import Home from "./Containers/Home";

function App() {
  return (
    <div className="bg-[#fff] w-screen h-screen inter ">
      <header>
        <Topheader />
        <BtmHeader />
      </header>
      <Home />
    </div>
  );
}

export default App;
