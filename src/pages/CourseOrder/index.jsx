import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { servicesCourse } from "../../services/servicesCourse";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import { Roles } from "../../contant/roles";
import { useAuthen } from "../../components/AuthenContext";
import { validate } from "../../utils/validate";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Radio from "../../components/Radio";

const CourseOrder = () => {
  const { slug } = useParams();
  const {
    data: courseDetail,
    loading: courseDetailLoading,
    error: courseDetailError,
  } = useQuery(() => servicesCourse.getCoursesBySlug(slug));
  console.log("data Course: ", courseDetail);
  const { name, price, teams, image, tags } = courseDetail || "";
  const teacherInfo = teams?.find((member) =>
    member.tags?.includes(Roles.Teacher)
  );
  const { profileInfo } = useAuthen();
  //State lưu thông tin người dùng nhập
  const [form, setForm] = useState({});
  //State lưu lỗi tương ứng với mỗi Input
  let [errors, setErrors] = useState({});
  //Rules
  const rules = {
    name: [{ required: true, message: "Vui lòng nhập Họ và Tên" }],
    phone: [{ required: true }, { regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/ }],
    type: [{ required: true, message: "Vui lòng chọn hình thức học" }],
  };
  //Submit
  const onSubmit = () => {
    const errorsObj = validate(rules, form);
    setErrors(errorsObj);
    console.log("Form: ", form);
    if (Object.keys(errorsObj)?.length === 0) {
      console.log("Success");
    } else {
      console.log("errors", errorsObj);
    }
  };
  const onInputChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };
  const validateForm = (fieldName) => {
    return {
      value: form[fieldName],
      error: errors[fieldName],
      onChange: (ev) => onInputChange(fieldName, ev.target.value),
    };
  };
  const typeOptions =
    tags?.map((tag) => {
      return {
        label: tag,
        value: tag?.toLowerCase(),
      };
    }) || {};

  //Feild profile
  useEffect(
    () => {
      if (profileInfo) {
        setForm({
          name: profileInfo?.firstName,
          email: profileInfo?.email,
          phone: profileInfo?.phone,
          type: typeOptions?.[0]?.value || "",
        });
      }
    },
    [profileInfo],
    [typeOptions]
  );

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <div className="itemorder infoorder">
            <h3 className="title --t3">Thông tin đơn hàng</h3>
            <div className="boxorder">
              <div className="boxorder__col">
                <label className="label">Tên khoá học</label>
                <div className="boxorder__col-course">
                  <div className="img">
                    <img src={image} alt={slug} />
                  </div>
                  <div className="info">
                    <p className="name">
                      <strong>{name}</strong>
                    </p>
                    <p>{teacherInfo?.name}</p>
                  </div>
                </div>
              </div>
              <div className="boxorder__col">
                <label className="label">Tạm tính</label>
                <p>{formatCurrency(price)}đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">Giảm giá</label>
                <p>0đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">thành tiền</label>
                <p>
                  <strong>{formatCurrency(price)}đ</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="itemorder formorder">
            <h3 className="title --t3">Thông tin cá nhân</h3>
            <div className="boxorder">
              <form action="#" className="form">
                <div className="form-container">
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
                      placeholder="Nhập Email"
                      required
                      disabled
                      {...validateForm("email")}
                    />
                  </div>
                </div>
                <div className="form-container">
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
                      options={typeOptions}
                      label="Hình thức học"
                      required
                      {...validateForm("type")}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="itemorder paymentorder">
            <h3 className="title --t3">Hình thức thanh toán</h3>
            <Radio className="boxorder">
              <div className="boxorder__pay">
                <Radio.Option>
                  <img src="/img/icon-payment-method-atm.svg" alt="" />
                  <span className="checkmark" />
                  Thành toán bằng chuyển khoản
                </Radio.Option>
                {/* <label className="radiocontainer">
                  <img src="/img/icon-payment-method-atm.svg" alt="" />
                  Thành toán bằng chuyển khoản
                  <input type="radio" name="radio" />
                  <span className="checkmark" />
                </label> */}
                <div className="boxorder__pay-tooltip">
                  Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                  ngân hàng sẽ được gửi đến email của bạn, bạn vui lòng chuyển
                  khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
                  Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
                  bạn sau khi giao dịch thành công.
                </div>
              </div>
              <div className="boxorder__pay">
                <label className="radiocontainer">
                  <img src="/img/icon-payment-method-mo-mo.svg" alt="" />
                  Thanh toán bằng ví Momo
                  <input type="radio" name="radio" />
                  <span className="checkmark" />
                </label>
                <div className="boxorder__pay-tooltip">
                  Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản
                  MoMo sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản
                  với nội dung: mã khoá học, họ và tên, số điện thoại, CFD
                  Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của
                  bạn sau khi giao dịch thành công.
                </div>
              </div>
              {/* Khoá học video và video mentor thì không có thanh toán tiền mặt */}
              <div className="boxorder__pay">
                <label className="radiocontainer">
                  <img src="/img/icon-payment-method-cod.svg" alt="" />
                  Thanh toán bằng tiền mặt
                  <input type="radio" name="radio" />
                  <span className="checkmark" />
                </label>
                <div className="boxorder__pay-tooltip">
                  Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email
                  của bạn, bạn vui lòng đến văn phòng CFD Circle vào ngày khai
                  giảng để đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ
                  Chí Minh.
                </div>
              </div>
            </Radio>
          </div>
          {/* addclass --processing khi bấm đăng ký */}
          <Button onClick={onSubmit}>
            <span>Đăng ký khoá học</span>
            <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
            >
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrder;
