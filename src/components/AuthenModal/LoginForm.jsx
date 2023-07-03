import React, { useState } from "react";
import Input from "../Input";
import { validate } from "../../utils/validate";
import { useAuthen } from "../AuthenContext";

const LoginForm = () => {
  const { onLogin, renderForm, setRenderForm } = useAuthen();
  //State lưu thông tin người dùng nhập
  const [form, setForm] = useState({});
  //State lưu lỗi tương ứng với mỗi Input
  let [errors, setErrors] = useState({});
  const onInputChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  //Rules
  const rules = {
    email: [
      { required: true, message: "Vui lòng nhập email" },
      {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Vui lòng điền đúng email",
      },
    ],
    password: [{ required: true, message: "Vui lòng nhập mật khẩu" }],
  };

  const register = (registerField) => {
    return {
      value: form[registerField] || "",
      error: errors[registerField],
      onChange: (ev) => onInputChange(registerField, ev.target.value),
    };
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const errorsObj = validate(rules, form);
    setErrors(errorsObj);

    if (Object.keys(errorsObj)?.length === 0) {
      //call api
      // console.log("from", form);
      onLogin?.(form);
      setForm({});
    } else {
      console.log("Validate fail");
    }
  };

  const isRender = renderForm === "login";
  return (
    <div
      className={`modal__wrapper-content mdlogin ${isRender ? "active" : ""}`}
    >
      <h3 className="title --t3">Đăng nhập</h3>
      <form onSubmit={onSubmit} action="#" className="form">
        <div className="form-group">
          <Input
            label="Email"
            placeholder="Nhập email"
            required
            {...register("email")}
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            label="Mật khẩu "
            placeholder="Nhập mật khẩu"
            required
            {...register("password")}
          />
        </div>
        <div className="form__bottom">
          <p>Bạn chưa có tài khoản?</p>
          <div
            className="color--primary btnmodal"
            onClick={() => setRenderForm("register")}
          >
            <strong>Đăng ký</strong>
          </div>
        </div>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
