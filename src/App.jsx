import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar/Sidebar";
import Dashboard from "./Component/Dashboard/Dashboard";
import Categories from "./Component/Categories/Categories";
import Products from "./Component/Product/Product";
import ProductDetails from "./Component/Product/ProductDetails";
import AddProduct from "./Component/Product/AddProduct";
import Login from "./Component/Login/Login";
import UpdateProduct from "./Component/Product/UpdateProduct";
import Brand from "./Component/Brand/Brand";
import Order from "./Component/Order/Order";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {!token ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <div className="flex bg-zinc-100">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<Products />} />
              <Route path="/productsDetails" element={<ProductDetails />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/updateProduct" element={<UpdateProduct />} />
              <Route path="/orders" element={<Order />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
