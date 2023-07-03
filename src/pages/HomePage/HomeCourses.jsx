import React from "react";
import useQuery from "../../hooks/useQuery";
import { Skeleton } from "antd";
import CourseItem from "../../components/CourseItem";
import { servicesCourse } from "../../services/servicesCourse";
const HomeCourses = () => {
  //Course
  const { data, loading, error, refetch } = useQuery((query) =>
    servicesCourse.getCourses(query)
  );
  const courses = data?.courses || {};
  return (
    <section className="courses">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Tất cả <span className="color--primary">khóa học</span>
          </h2>
        </div>
        <div className="courses__list">
          {!loading && courses?.length === 0 && (
            <Empty
              description="Không có dữ liệu"
              style={{ margin: "0 auto" }}
            />
          )}
          {/* Loading */}
          {loading &&
            Array(6)
              .fill("")
              .map((_, index) => (
                <div className="courses__list" key={index}>
                  <Skeleton style={{ width: "520px", heigh: "515px" }} active />
                </div>
              ))}
          {/* //Render data */}
          {courses?.length > 0 &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}
        </div>
        <div className="courses__btnall">
          <a href="courses.html" className="course__btn btn btn--grey">
            Tất cả khoá học
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeCourses;
