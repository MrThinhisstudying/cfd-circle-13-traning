import React from "react";
import { Roles } from "../../contant/roles";
import { PATHS } from "../../contant/pathnames";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/format";

const CourseItem = React.memo((props) => {
  const { slug, image, tags, name, title, teams, price } = props || {};
  const teacherInfo = teams.find((member) =>
    member.tags?.includes(Roles.Teacher)
  );
  return (
    <>
      <div className="courses__list-item">
        <div className="img">
          <Link to={PATHS.COURSES + `/${slug}`}>
            <img src={image} alt={slug} className="course__thumbnail" />
            {tags && (
              <span className="course__img-badge badge">
                {tags.join("|") || ""}
              </span>
            )}
          </Link>
        </div>
        <div className="content">
          <p className="label">{name}</p>
          <h3 className="title --t3">
            <Link to={PATHS.COURSES + `/${slug}`}>{title}</Link>
          </h3>
          <div className="content__info">
            <div className="user">
              {teacherInfo && (
                <>
                  <div className="user__img">
                    <img src={teacherInfo?.image} alt="Avatar teacher" />
                  </div>
                  <p className="user__name">{teacherInfo?.name}</p>
                </>
              )}
            </div>
            <div className="price">
              <strong>{formatCurrency(price)} đ</strong>
            </div>
          </div>
          <div className="content__action">
            <Link to={`/register/${slug}`} className="btn btn--primary">
              Đăng ký ngay
            </Link>
            <Link to={`/register/${slug}`} className="btn btn--default">
              <img src="/img/icon-paper.svg" alt="icon paper" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});

export default CourseItem;
