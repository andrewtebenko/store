import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from "../../features/products/productsSlice";

import Example from '../DialogWindow/DialogWindow';

import UserForm from "../User/UserForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Header />
        <UserForm />
        <div className="container">
          <Sidebar />
          <AppRoutes />
        </div>
        <Example />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
