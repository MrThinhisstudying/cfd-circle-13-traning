import React from "react";
import { formatCurrency, formatTimeDisplay } from "../../utils/format";
import { Link } from "react-router-dom";
import { Roles } from "../../contant/roles";

const CourseHero = (courseDetail) => {
  const { duration, image, price, tags, name, startDate, teams, slug } =
    courseDetail?.courseDetail || {};

  const teacherInfo = teams?.find((member) =>
    member.tags?.includes(Roles.Teacher)
  );

  return (
    <section className="hero herodetail">
      <div className="hero__content">
        <div className="container">
          <h3 className="category label --white">frontend</h3>
          <h2 className="title --white">{name}</h2>
          <div className="infor">
            <div className="infor__item">
              <label className="label --white">Khai giảng</label>
              <p className="title --t3 --white">
                {formatTimeDisplay(startDate)}
              </p>
            </div>
            <div className="infor__item">
              <label className="label --white">Thời lượng</label>
              <p className="title --t3 --white">{duration}</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Hình thức</label>
              {tags && (
                <span className="title --t3 --white">
                  {tags.join("|") || ""}
                </span>
              )}
            </div>
          </div>
          {/* Chưa đăng ký */}
          <Link
            to={`/register/${slug}`}
            className="btn btn--primary btn-regcourse"
          >
            Đăng ký
          </Link>
          {/* Đã đăng ký */}
          {/* <div class="btn btn--primary btn-regcourse --disable">Đã đăng ký</div> */}
        </div>
      </div>
      <div className="hero__bottom">
        <div className="container-fluid">
          <a href className="user">
            <div className="user__img">
              <img src={teacherInfo?.image} alt="Avatar teacher" />
            </div>
            <p className="user__name --white">{teacherInfo?.name}</p>
          </a>
          <div className="pricebox">
            <p className="title --t3 --white">{formatCurrency(price)} VND</p>
          </div>
          <a
            href="https://www.facebook.com/sharer/sharer.php?sdk=joey&u=https://cfdcircle.vn/khoa-hoc/khoa-hoc-lap-trinh-frontend-master-30&display=popup&ref=plugin&src=share_button"
            onclick="return !window.open(this.href, 'Facebook', 'width=640,height=580')"
            className="sharebox s--white"
          >
            Chia sẻ
            <i>
              <img
                src="https://cfdcircle.vn/img/iconshare.svg"
                alt="CFD Circle"
              />
            </i>
          </a>
        </div>
      </div>
      <div className="hero__background">
        <img className="hero__background-img" src={image} alt="CFD Circle" />
      </div>
    </section>
  );
};

export default CourseHero;
