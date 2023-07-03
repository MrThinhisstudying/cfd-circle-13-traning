import React, { useEffect, useState } from "react";
import { useAuthen } from "../../components/AuthenContext";
import Input from "../../components/Input";
import { message } from "antd";
import { validate } from "../../utils/validate";
import { authService } from "../../services/authService";
import { LOCAL_STORAGE } from "../../contant/localStorage";

const MyInfo = () => {
  const { profileInfo, setProfileInfo } = useAuthen();
  const [form, setForm] = useState({
    password: "***********************",
  });
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  let [errors, setErrors] = useState({});
  const onInputChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };
  const register = (registerField) => {
    return {
      value: form[registerField] || "",
      error: errors[registerField],
      onChange: (ev) => onInputChange(registerField, ev.target.value),
    };
  };
  const rules = {
    firstName: [{ required: true, message: "Vui lòng nhập họ và tên" }],
    email: [
      { required: true, message: "Vui lòng nhập email" },
      {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Vui lòng điền đúng email",
      },
    ],
    phone: [
      { required: true, message: "Vui lòng nhập số điện thoại" },
      {
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: "Số điện thoại không tồn tại",
      },
    ],
  };
  const onSubmit = async (ev) => {
    ev?.preventDefault();
    try {
      const errObj = validate(rules, form);
      setErrors(errObj);
      if (Object.keys(errObj)?.length !== 0)
        return message.error("Vui lòng nhập đầy đủ thông tin");

      const res = await authService.updateProfile(form, token);
      if (res.status) {
        setProfileInfo(form);
        message.success("Cập nhật thông tin thành công");
      }
      console.log("from", form);
    } catch (error) {
      message.error("Cật nhật thông tin thất bại.");
    }
  };

  useEffect(() => {
    if (profileInfo) {
      setForm({ ...form, ...profileInfo });
    }
  }, [profileInfo]);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form onSubmit={onSubmit} action="#" className="form">
        <div className="form-container">
          <div className="form-group">
            <Input
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              required
              {...register("firstName")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              required
              {...register("phone")}
            />
          </div>
        </div>
        <div className="form-container">
          <div className="form-group">
            <Input
              label="Email"
              disabled
              placeholder="Nhập Email"
              required
              {...register("email")}
            />
          </div>
          <div className="form-group">
            {/* <div className="form-grouppass">
              
              <div className="textchange btnmodal" data-modal="mdchangepass">
                Đổi mật khẩu
              </div>
            </div> */}
            <Input
              type="password"
              disabled
              label="Mật khẩu"
              placeholder="**********"
              required
              {...register("password")}
            />
          </div>
        </div>
        <div className="form-group">
          {/* className="form__input" */}
          <Input label="Facebook URL" {...register("facebookURL")} />
        </div>
        <div className="form-group">
          <Input label="Website" {...register("website")} />
        </div>
        <div className="form-container textarea">
          <Input
            label="Giới thiệu bản thân"
            {...register("introduce")}
            renderInput={(inputProps) => (
              <textarea className="form__input" {...inputProps} />
            )}
          />
        </div>
        <div className="form-group">
          <div className="btnsubmit">
            <button className="btn btn--primary">Lưu lại</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
