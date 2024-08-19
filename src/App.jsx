import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./components/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./pages/Catalog";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/ra67-diplom-react/" element={<Home />} />
        <Route path="/ra67-diplom-react/catalog" element={<Catalog />} />
        <Route path="/ra67-diplom-react/about" element={<About />} />
        <Route path="/ra67-diplom-react/contact" element={<Contact />} />
        <Route path="/ra67-diplom-react/product/:id" element={<Product />} />
        <Route path="/ra67-diplom-react/favorites" element={<Favorites />} />
        <Route path="/ra67-diplom-react/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
