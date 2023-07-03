import React, { useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { validate } from "../../utils/validate";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import useMutation from "../../hooks/useMutation";
import { subscribesService } from "../../services/subscribesService";
import { message } from "antd";

const ContactPage = () => {
  //State lưu thông tin người dùng nhập
  const [form, setForm] = useState({});
  //State lưu lỗi tương ứng với mỗi Input
  let [errors, setErrors] = useState({});
  const onInputChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };
  const navigate = useNavigate();
  //Rules
  const rules = {
    name: [{ required: true, message: "Vui lòng nhập Họ và Tên" }],
    email: [{ required: true }, { regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }],
    phone: [{ required: true }, { regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/ }],
    topic: [{ required: true, message: "Vui lòng chọn chủ đề" }],
    content: [{ required: true, message: "Vui lòng nhập nội dung" }],
  };

  const { excute, data, loading, error } = useMutation(
    subscribesService.subscribes
  );

  //Submit
  const onSubmit = () => {
    const errorsObj = validate(rules, form);
    setErrors(errorsObj);

    if (Object.keys(errorsObj)?.length === 0) {
      const payload = {
        name: form?.name || "",
        title: "",
        email: form?.email || "",
        description: form?.content || "",
      };
      excute(payload);
      // errors = {};
      // alert("Gửi thành công");
      navigate("/");
      message.success("Success");
    } else {
      console.log("errors", errorsObj);
    }
  };
  const validateForm = (fieldName) => {
    return {
      value: form[fieldName],
      error: errors[fieldName],
      onChange: (ev) => onInputChange(fieldName, ev.target.value),
    };
  };

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <div className="textbox">
          <h2 className="title --t2">Liên hệ &amp; Hỗ trợ</h2>
          <p className="desc">
            Bạn có bất cứ thắc mắc nào thì đừng ngần ngại liên hệ để được hỗ
            trợ?
            <br />
            Chúng tôi luôn ở đây
          </p>
        </div>
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <div className="sidebar">
              <div className="sidebar__address infor">
                <div className="infor__item">
                  <label className="label">CFD Circle</label>
                  <p className="title --t4">
                    666/46/29 Ba Tháng Hai, phường 14, quận 10, TPHCM
                  </p>
                </div>
                <div className="infor__item">
                  <label className="label">Email</label>
                  <p className="title --t4">info@cfdcircle.vn</p>
                </div>
                <div className="infor__item">
                  <label className="label">Số điện thoại</label>
                  <p className="title --t4">098 9596 913</p>
                </div>
              </div>
              <div className="sidebar__business">
                <p>
                  Đối với yêu cầu kinh doanh xin vui lòng gửi cho chúng tôi tại:
                </p>
                <a href="#">business@cfdcircle.vn</a>
              </div>
              <a href="#" className="sidebar__messenger btn btn--primary">
                Trò chuyện trực tuyến
              </a>
            </div>
            <div className="form">
              <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
              <div className="form-group">
                <Input
                  label="Họ và tên"
                  placeholder="Nhập Họ và Tên"
                  required
                  {...validateForm("name")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Email"
                  placeholder="Nhập email"
                  required
                  {...validateForm("email")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  required
                  {...validateForm("phone")}
                />
              </div>
              <div className="form-group">
                <Select
                  const
                  options={[
                    {
                      value: "",
                      label: "--",
                    },
                    {
                      value: "res",
                      label: "Responsive",
                    },
                    {
                      value: "react",
                      label: "React",
                    },
                  ]}
                  label={"Chủ đề cần hỗ trợ"}
                  required
                  {...validateForm("topic")}
                />
              </div>
              <div className="form-group">
                <Input
                  label="Nội dung"
                  placeholder="Nhập nội dung"
                  required
                  renderProps={(inputProps) => (
                    <textarea
                      className={`select form__input ${
                        !!inputProps.error ? "formerror" : ""
                      }`}
                      {...inputProps}
                    />
                  )}
                  {...validateForm("content")}
                />
                {/* <label className="label">
                  Nội dung <span>*</span>
                </label>
                <textarea
                  className="form__input"
                  defaultValue={""}
                  value={form.content}
                  onChange={(ev) => onInputChange("content", ev.target.value)}
                /> */}
              </div>
              <div className="btncontrol">
                <button className="btn btn--primary" onClick={onSubmit}>
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
