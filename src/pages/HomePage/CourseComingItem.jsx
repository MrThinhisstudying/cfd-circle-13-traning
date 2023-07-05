import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Roles } from "../../contant/roles";
import { PATHS } from "../../contant/pathnames";

const CourseComingItem = (props) => {
  const { slug, image, tags, name, title, teams } = props || {};
  const teacherInfo = teams?.find((member) =>
    member.tags?.includes(Roles.Teacher)
  );
  return (
    <div className="coursecoming__item">
      <div className="coursecoming__item-img">
        <Link to={PATHS.COURSES + `/${slug}`}>
          <img src={image} alt="Khóa học sắp ra mắt CFD" />
        </Link>
      </div>
      <div className="coursecoming__item-content">
        <p className="category label">{title}</p>
        <h2 className="title --t2">
          <Link to={PATHS.COURSES + `/${slug}`}>{name}</Link>
        </h2>
        <div className="user">
          {teacherInfo && (
            <>
              <div className="user__img">
                <img src={teacherInfo.image} alt="Avatar teacher" />
              </div>
              <p className="user__name">{teacherInfo.name}</p>
            </>
          )}
        </div>
        <div className="info">
          <div className="labeltext">
            <span className="label --blue">Ngày khai giảng</span>
            <p className="title --t2">04/05/2023</p>
          </div>
          <div className="labeltext">
            <span className="label --blue">Hình thức học</span>
            {tags && <p className="title --t2">{tags.join("|") || ""}</p>}
          </div>
        </div>
        <div className="btnwrap">
          <Link to={`/register/${slug}`} className="btn btn--primary">
            Đăng Ký Học
          </Link>
          <Link
            to={PATHS.COURSES + `/${slug}`}
            className="btn btn--border --black"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseComingItem;
