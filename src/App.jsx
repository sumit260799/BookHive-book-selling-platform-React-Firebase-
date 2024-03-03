import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import AddBooks from "./pages/AddBooks";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import SingleBookView from "./pages/SingleBookView";
import FetchBooks from "./pages/FetchBooks";
import FetchOrders from "./pages/FetchOrders";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addbooks" element={<AddBooks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view/:id" element={<SingleBookView />} />
          <Route path="/view/mybooks" element={<FetchBooks />} />
          <Route path="/view/myorders/:id" element={<FetchOrders />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
