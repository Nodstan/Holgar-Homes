import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import PropertyListings from './pages/PropertyListings';
import PropertyDetails from './pages/PropertyDetails';

export default function App() {
  return (
    <Router>
      <Routes>
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
