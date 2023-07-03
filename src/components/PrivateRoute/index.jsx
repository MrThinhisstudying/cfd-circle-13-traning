import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOCAL_STORAGE } from "../../contant/localStorage";

const PrivateRoute = ({ redirecPath = "/" }) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.token);
  if (!accessToken || "") {
    return <Navigate to={redirecPath} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
