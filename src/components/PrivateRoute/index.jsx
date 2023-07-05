import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOCAL_STORAGE } from "../../contant/localStorage";
import { useAuthen } from "../AuthenContext";

const PrivateRoute = ({ redirecPath = "/" }) => {
  const { openAuthenModal } = useAuthen();
  const accessToken = localStorage.getItem(LOCAL_STORAGE.token);
  if (!accessToken || "") {
    openAuthenModal();
    return <Navigate to={redirecPath} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
