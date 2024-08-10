import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import ProductCart from "./components/ProductCard";
import CartPage from './components/cartPage';
function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ProductCart />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
