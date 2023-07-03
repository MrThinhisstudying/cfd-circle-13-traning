import axios from "axios";
import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../contant/pathnames";
import { formatCurrency } from "../../utils/format";
import CourseItem from "../../components/CourseItem";
import { servicesCourse } from "../../services/servicesCourse";
import { Empty, Skeleton, message } from "antd";
import useQuery from "../../hooks/useQuery";
import Input from "../../components/Input";
import useDebounce from "../../hooks/useDebounce";

const CoursePage = () => {
  const { data, loading, error, refetch } = useQuery((query) =>
    servicesCourse.getCourses(query)
  );
  const courses = data?.courses || {};

  const [searchTerm, setSearchTerm] = useState(undefined);
  const debouncedSearchTerm = useDebounce(searchTerm, 5000);

  useEffect(() => {
    if (typeof debouncedSearchTerm === "string") {
      refetch(debouncedSearchTerm ? `?search=${debouncedSearchTerm}` : "");
    }
  }, [debouncedSearchTerm]);

  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="search" style={{ width: "30%", margin: "0 auto" }}>
          <Input
            type="text"
            value={searchTerm || ""}
            placeholder="Tìm kiếm khóa học"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
      </div>
    </main>
  );
};

export default CoursePage;
