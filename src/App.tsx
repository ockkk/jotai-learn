import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ProviderLeaning } from "./Provider/ProviderLearning";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProviderLeaning />} />
        <Route path="/temp" element={<ProviderLeaning />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
