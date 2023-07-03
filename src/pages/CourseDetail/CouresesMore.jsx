import React from "react";
import useQuery from "../../hooks/useQuery";
import { servicesCourse } from "../../services/servicesCourse";

const CouresesMore = () => {
  const { data, loading, error } = useQuery((query) =>
    servicesCourse.getCourses(query)
  );
  console.log("data: ", data);
  console.log("loading: ", loading);
  console.log("error: ", error);
  const courses = data?.courses || {};
  return (
    <section className="courses">
      <div className="container">
        <div className="heading --center --noline">
          <h2 className="heading__title title --t2">Khoá học đề xuất</h2>
        </div>
        <div className="courses__list">
          {courses?.length > 0 &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default CouresesMore;
