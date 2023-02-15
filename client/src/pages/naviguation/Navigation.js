import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../Home";
import Carte from "../Carte";
import Admin from "../Admin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrivateRoute from "./PrivateRoute";
import Connect from "../../data/Connect";
import UndifinedRoute from "../UndifinedPage";

const Navigation = ({ connected, admin }) => {
  const [isConnected, setIsConnected] = useState(connected);
  const [isAdmin, setIsAdmin] = useState(admin);

  return (
    <>
      {<Connect isConnected={setIsConnected} isAdmin={setIsAdmin} />}
      <BrowserRouter>
        <>
          <Header isConnected={isConnected} display={true} />
          <Routes>
            <Route path="*" element={<UndifinedRoute />} />
            <Route path="/" element={<Home />} />
            <Route path="/carte" element={<Carte />} />
            {isAdmin === true ? (
              <Route element={<PrivateRoute isAdmin={isAdmin} />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            ) : null}
          </Routes>
        </>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Navigation;
