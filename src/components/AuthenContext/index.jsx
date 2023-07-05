import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { message } from "antd";
import { LOCAL_STORAGE } from "../../contant/localStorage";
import { orderService } from "../../services/orderService";

const AuthenContext = createContext({});
export const AuthenProvider = ({ children }) => {
  const [isAuthenModalOpen, setIsAuthenModalOpen] = useState(false);
  const [renderForm, setRenderForm] = useState("login");
  const [profileInfo, setProfileInfo] = useState({});
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.token);
    if (accessToken) {
      onGetProfile();
      onGetCoursHistories();
      onGetPayment();
    }
  }, []);

  const openAuthenModal = () => {
    if (!!!localStorage.getItem(LOCAL_STORAGE.token)) {
      setIsAuthenModalOpen(true);
    }
  };
  const closeAuthenModal = () => {
    setIsAuthenModalOpen(false);
    setRenderForm("login");
  };

  const onLogin = async (loginData) => {
    //Call API
    console.log("loginDAta", loginData);
    try {
      const res = await authService.login(loginData);
      const { token, refreshToken } = res?.data?.data || {};

      // Lưu vào LocalStorage
      localStorage.setItem(LOCAL_STORAGE.token, token);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken);

      if (!!token) {
        onGetProfile();
        onGetCoursHistories();
        onGetPayment();
        message.success("Đăng nhập thành công");

        //Đóng modal
        closeAuthenModal();
      }
    } catch (error) {
      console.log("error", error);
      message.error("Đăng nhập thất bại");
    }
  };

  //On Register
  const onRegister = async (registerData) => {
    //Call API
    console.log("registerDAta", registerData);
    try {
      const res = await authService.register(registerData);
      console.log("res", res?.data?.data);

      if (res?.data?.data?.id) {
        message.success("Đăng ký thành công");
        onLogin({
          email: registerData.email,
          password: registerData.password,
        });
      }
    } catch (error) {
      console.log("error", error);
      message.error("Đăng ký thất bại");
    }
  };

  const onLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.token);
    localStorage.removeItem(LOCAL_STORAGE.refreshToken);
    setProfileInfo({});
    onGetCoursHistories([]);
    onGetPayment([]);
    message.success("Đăng xuất thành công");
  };

  //Get profile
  const onGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      console.log("ProfileRes:", profileRes?.data?.data);
      if (profileRes?.data?.data) {
        setProfileInfo(profileRes.data.data);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const onGetCoursHistories = async () => {
    const res = await orderService.getCourseHistory();
    console.log("res", res);
    if (res?.data?.data) {
      const mapCourses = res?.data?.data?.orders;
      console.log("mapCourse: ", mapCourses);
      setCourseInfo(mapCourses ?? []);
    }
  };
  const onGetPayment = async () => {
    const res = await orderService.getPaymentHistories();
    console.log("res", res);
    if (res?.data?.data) {
      const mapPayment = res?.data?.data?.orders;
      setPaymentInfo(mapPayment ?? []);
    }
  };
  return (
    <AuthenContext.Provider
      value={{
        isAuthenModalOpen,
        renderForm,
        profileInfo,
        courseInfo,
        paymentInfo,
        setProfileInfo,
        setCourseInfo,
        setPaymentInfo,
        openAuthenModal,
        closeAuthenModal,
        onLogin,
        onRegister,
        setRenderForm,
        onLogout,
        onGetCoursHistories,
        onGetPayment,
      }}
    >
      {children}
    </AuthenContext.Provider>
  );
};

export const useAuthen = () => useContext(AuthenContext);
