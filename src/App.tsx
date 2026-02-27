import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './components/Home';
import Admin from './components/Admin';
import PropertyListings from './components/PropertyListings';
import PropertyDetails from './components/PropertyDetails';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="properties" element={<PropertyListings/>} />
          <Route path="property/:id" element={<PropertyDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}
