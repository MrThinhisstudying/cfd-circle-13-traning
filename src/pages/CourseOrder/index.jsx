import React, { useEffect, useMemo, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { servicesCourse } from "../../services/servicesCourse";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import { Roles } from "../../contant/roles";
import { useAuthen } from "../../components/AuthenContext";
import { validate } from "../../utils/validate";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Radio from "../../components/Radio";
import { orderService } from "../../services/orderService";
import { message } from "antd";
import { PATHS } from "../../contant/pathnames";
import useDebounce from "../../hooks/useDebounce";
import PageLoading from "../../components/Loading";

const CourseOrder = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: courseDetail,
    loading: courseDetailLoading,
    error: courseDetailError,
  } = useQuery(() => servicesCourse.getCoursesBySlug(slug));
  console.log("data Course: ", courseDetail);
  const { name, price, teams, image, tags, id: CourseId } = courseDetail || "";
  const teacherInfo = useMemo(() => {
    return teams?.find((team) => team.tags?.includes(Roles.Teacher));
  }, [teams]);
  const { profileInfo, onGetCoursHistories, onGetPayment, courseInfo } =
    useAuthen();
  //State lưu thông tin người dùng nhập
  const [form, setForm] = useState({});
  //State lưu lỗi tương ứng với mỗi Input
  let [errors, setErrors] = useState({});
  //Rules
  const rules = {
    name: [{ required: true, message: "Vui lòng nhập Họ và Tên" }],
    phone: [{ required: true }, { regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/ }],
  };
  //Order Course
  const onOrder = async () => {
    if (CourseId) {
      const payload = {
        name: form?.name,
        phone: form?.phone,
        course: CourseId,
        type: form?.type,
        paymentMethod,
      };
      console.log("payload: ", payload);
      try {
        const res = await orderService.orderCourse(payload);
        if (res?.data?.data) {
          message.success("Đăng ký thành công");
          await onGetCoursHistories();
          await onGetPayment();
          navigate(PATHS.PROFILE.COURSES);
        }
      } catch (error) {
        console.log("error: ", error);
        message.error("Đăng ký thất bại");
      }
    } else {
      //fall
    }
  };
  //Submit
  const onSubmit = () => {
    if (!isAlreadyOrdered) {
      const errorsObj = validate(rules, form);
      setErrors(errorsObj);
      console.log("Form: ", form);
      if (Object.keys(errorsObj)?.length === 0) {
        console.log("Success");
        onOrder();
      } else {
        console.log("errors", errorsObj);
      }
    } else {
      message.warning("Khóa học đã được đăng ký");
    }
  };

  const validateForm = (fieldName) => {
    return {
      value: form[fieldName],
      error: errors[fieldName] || "",
      onChange: (ev) => setForm({ ...form, [fieldName]: ev.target.value }),
    };
  };

  const typeOptions =
    tags?.map((tag) => {
      return {
        label: tag,
        value: tag?.toLowerCase(),
      };
    }) || {};

  //
  console.log("Course info: ", courseInfo);
  const orderCourse = courseInfo?.find((info) => info?.course?.id === CourseId);
  console.log("Course order: ", orderCourse);
  const {
    name: orderName,
    price: orderPrice,
    teams: orderTeams,
    image: orderImage,
  } = orderCourse?.course || {};
  const isAlreadyOrdered = !!orderCourse?.id;
  const orderTeacherInfo = orderTeams?.find((member) =>
    member.tags?.includes(Roles.Teacher)
  );
  //Hình thức thành toán
  const [paymentMethod, setPaymentMethod] = useState("atm");
  const onPaymentChange = (method) => setPaymentMethod(method);
  console.log("paymentMethod", paymentMethod);
  //Feild profile
  useEffect(() => {
    if (profileInfo || orderCourse) {
      setForm({
        name: orderCourse?.name || profileInfo?.firstName,
        email: orderCourse?.email || profileInfo?.email,
        phone: orderCourse?.phone || profileInfo?.phone,
        type: orderCourse?.type || typeOptions?.[0]?.value || "",
      });
      orderCourse?.paymentMethod &&
        setPaymentMethod(orderCourse?.paymentMethod || "atm");
    }
  }, [profileInfo, orderCourse, setPaymentMethod]);
  //

  //Order Course
  //Loading
  const isPageLoading = useDebounce(courseDetailLoading, 500);
  if (isPageLoading)
    return (
      <main className="mainwrapper --ptop">
        <PageLoading />
      </main>
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
                    <img src={orderImage || image} alt={slug} />
                  </div>
                  <div className="info">
                    <p className="name">
                      <strong>{orderName || name}</strong>
                    </p>
                    <p>{orderTeacherInfo?.name || teacherInfo?.name}</p>
                  </div>
                </div>
              </div>
              <div className="boxorder__col">
                <label className="label">Tạm tính</label>
                <p>{formatCurrency(orderPrice || price)}đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">Giảm giá</label>
                <p>0đ</p>
              </div>
              <div className="boxorder__col">
                <label className="label">thành tiền</label>
                <p>
                  <strong>{formatCurrency(orderPrice || price)}đ</strong>
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
                      disabled={isAlreadyOrdered}
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
                      disabled={isAlreadyOrdered}
                      {...validateForm("phone")}
                    />
                  </div>
                  <div className="form-group">
                    <Select
                      const
                      options={typeOptions}
                      label="Hình thức học"
                      required
                      disabled={isAlreadyOrdered}
                      {...validateForm("type")}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="itemorder paymentorder">
            <h3 className="title --t3">Hình thức thanh toán</h3>
            <Radio
              className="boxorder"
              onChange={onPaymentChange}
              defaultValue={paymentMethod}
              disabled={isAlreadyOrdered}
            >
              <div className="boxorder__pay">
                <Radio.Option value="atm">
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
                <Radio.Option value="momo">
                  <img src="/img/icon-payment-method-mo-mo.svg" alt="" />
                  <span className="checkmark" />
                  Thanh toán bằng ví Momo
                </Radio.Option>
                {/* <label className="radiocontainer">
                  <img src="/img/icon-payment-method-mo-mo.svg" alt="" />
                  Thanh toán bằng ví Momo
                  <input type="radio" name="radio" />
                  <span className="checkmark" />
                </label> */}
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
                <Radio.Option value="cash">
                  <img src="/img/icon-payment-method-cod.svg" alt="" />
                  <span className="checkmark" />
                  Thanh toán bằng tiền mặt
                </Radio.Option>
                {/* <label className="radiocontainer">
                  <img src="/img/icon-payment-method-cod.svg" alt="" />
                  Thanh toán bằng tiền mặt
                  <input type="radio" name="radio" />
                  <span className="checkmark" />
                </label> */}
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
          <Button
            onClick={onSubmit}
            disabled={isAlreadyOrdered}
            style={{ width: "100%" }}
          >
            <span>
              {!!isAlreadyOrdered ? "Đã đăng ký khóa học" : "Đăng ký khóa học"}
            </span>
            {/* <svg
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
            </svg> */}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrder;
