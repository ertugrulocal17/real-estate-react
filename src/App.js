import { Route, Routes } from "react-router-dom";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
function App() {
  return (
    <div className="max-w-[1440px] mx-auto bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="property/:id" element={<PropertyDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
