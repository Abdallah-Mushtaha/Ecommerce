import Home from "./Containers/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#fff] w-screen  inter pt-52">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
