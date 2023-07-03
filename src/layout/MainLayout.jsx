import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PageLoading from "../components/Loading";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import AuthenModal from "../components/AuthenModal";
import { AuthenProvider } from "../components/AuthenContext";

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/dest/main.js";
    document.body.appendChild(script);
  }, []);
  return (
    <AuthenProvider>
      {/* Loading page */}
      {/* <PageLoading /> */}

      {/* Header */}
      <Header />

      {/* Nav */}
      <Nav />

      {/* Main */}
      <Outlet />

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <AuthenModal />
    </AuthenProvider>
  );
};

export default MainLayout;
