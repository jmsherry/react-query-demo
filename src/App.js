import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "normalize.css";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import UpdateCar from "./pages/UpdateCar";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/update-car/:id" element={<UpdateCar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
