import React from "react";
import { homeService } from "../../services/homeService";
import useQuery from "../../hooks/useQuery";
const HomeFeatured = () => {
  const dataHome = useQuery((query) => homeService.getHomePage(query));
  const homeFeatured = dataHome?.data?.data?.special;

  return (
    <section className="featured">
      <img src="/img/icon-cfd.svg" alt="" className="featured__c" />
      <div className="container">
        <div className="featured__title">
          <h2 className="title --t2 --white">
            Những điều <br />
            <span>Đặc biệt</span> Tại CFD
          </h2>
        </div>
        <div className="featured__content">
          {homeFeatured?.length > 0 &&
            homeFeatured?.map((detail, index) => {
              return (
                <div
                  className="featured__content-item"
                  key={index || detail?.id}
                >
                  <h3 className="title --t3 --white">{detail?.title}</h3>
                  <p>{detail?.description}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatured;
