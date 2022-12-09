import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Header } from "./header/Header";
import { Layout } from "./layout/Layout";
import { ProviderLeaning } from "./provider/ProviderLearning";

function App() {
  console.log("test");
  return (
    <Layout>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProviderLeaning />} />
          <Route path="/temp" element={<ProviderLeaning />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
