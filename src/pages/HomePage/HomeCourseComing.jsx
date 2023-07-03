import React from "react";
import useQuery from "../../hooks/useQuery";
import { servicesCourse } from "../../services/servicesCourse";
import CourseComingItem from "./CourseComingItem";

const HomeCourseComing = () => {
  const { data, loading, error, refetch } = useQuery(() =>
    servicesCourse.getCourses()
  );
  const courses = data?.courses || {};

  return (
    <section className="coursecoming --scpadding">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Khoá học <span className="color--primary">sắp khai giảng</span>
          </h2>
          <div className="control">
            <div className="control__prev">
              <img src="/img/icon-btn-control.svg" alt="icon prev" />
            </div>
            <div className="control__next">
              <img src="/img/icon-btn-control.svg" alt="icon next" />
            </div>
          </div>
        </div>
      </div>
      <div className="coursecoming__list" id="coursecoming__slider">
        {courses?.length > 0 &&
          courses.map((course, index) => {
            return <CourseComingItem key={course?.id || index} {...course} />;
          })}
      </div>
    </section>
  );
};

export default HomeCourseComing;
