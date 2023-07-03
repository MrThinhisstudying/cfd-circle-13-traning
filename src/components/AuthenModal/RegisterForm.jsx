import React, { useEffect, useRef, useState } from "react";
import { validate } from "../../utils/validate";
import Input from "../Input";
import { useAuthen } from "../AuthenContext";

const RegisterForm = () => {
  const { onRegister, renderForm, setRenderForm } = useAuthen();
  //State lưu thông tin người dùng nhập
  const [form, setForm] = useState({});
  //State lưu lỗi tương ứng với mỗi Input
  let [errors, setErrors] = useState({});

  //Rules
  const rules = {
    name: [{ required: true, message: "Vui lòng nhập họ và tên" }],

    email: [
      { required: true, message: "Vui lòng nhập email" },
      {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Vui lòng điền đúng email",
      },
    ],
    password: [{ required: true, message: "Vui lòng nhập mật khẩu" }],
  };
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

  const onSubmit = (ev) => {
    ev.preventDefault();
    const errorsObj = validate(rules, form);
    setErrors(errorsObj);

    if (Object.keys(errorsObj)?.length === 0) {
      //call api
      //   console.log("from", form);
      onRegister?.({
        firstName: form?.name || "",
        lastName: "",
        email: form?.email || "",
        password: form?.password || "",
      });
      setForm({});
    } else {
      console.log("Validate fail");
    }
  };

  const isRender = renderForm === "register";

  const firstInputRef = useRef();

  useEffect(() => {
    if (isRender) {
      firstInputRef?.current?.focus();
    } else {
      setForm({});
      setErrors({});
    }
  }, [isRender]);

  return (
    <div
      className={`modal__wrapper-content mdregister ${
        isRender ? "active" : ""
      }`}
    >
      <h3 className="title --t3">Đăng ký</h3>
      <form onSubmit={onSubmit} action="#" className="form">
        <div className="form-group">
          <Input
            ref={firstInputRef}
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            required
            {...register("name")}
          />
        </div>
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

        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <a className="color--primary" href="#">
            Chính Sách Điều Khoản
          </a>{" "}
          của CFD
        </p>
        <div className="form__bottom">
          <p>Bạn đã có tài khoản?</p>
          <div
            className="color--primary btnmodal"
            data-modal="mdlogin"
            onClick={() => setRenderForm("login")}
          >
            <strong>Đăng nhập</strong>
          </div>
        </div>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng ký tài khoản
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
