import React, { useEffect } from "react";
import useQuery from "../../hooks/useQuery";
import { servicesCourse } from "../../services/servicesCourse";
import CourseComingItem from "./CourseComingItem";

const HomeCourseComing = ({ commingCourses }) => {
  const dataCourseComing = commingCourses?.courses || {};
  useEffect(() => {
    function courseComingList() {
      let courseComingSlider = $("#coursecoming__slider");
      courseComingSlider.flickity({
        cellAlign: "left",
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        dragThreshold: 0,
        wrapAround: true,
      });

      $(".coursecoming .control .control__next").on("click", function (e) {
        e.preventDefault();
        courseComingSlider.flickity("next");
      });
      $(".coursecoming .control .control__prev").on("click", function (e) {
        e.preventDefault();
        courseComingSlider.flickity("previous");
      });
    }

    if (dataCourseComing?.length > 0) {
      courseComingList();
    }
  }, [dataCourseComing]);

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
        {dataCourseComing?.length > 0 &&
          dataCourseComing.map((course, index) => {
            return <CourseComingItem key={course?.id || index} {...course} />;
          })}
      </div>
    </section>
  );
};

export default HomeCourseComing;
