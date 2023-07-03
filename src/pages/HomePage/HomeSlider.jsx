import React from "react";
import { useAuthen } from "../../components/AuthenContext";
import { homeService } from "../../services/homeService";
import useQuery from "../../hooks/useQuery";

const HomeSlider = () => {
  const { openAuthenModal } = useAuthen();
  const dataHome = useQuery((query) => homeService.getHomePage(query));
  const homeSlider = dataHome?.data;
  const titleSlider = homeSlider?.title.split("\n") || [];
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="container">
          <h1 className="title --white">
            {homeSlider?.title}
            {/* {
              <>
                {titleSlider?.titleSlider?.[0]}
                <br />
                {titleSlider?.titleSlider?.[1]}
              </>
            } */}
          </h1>
          <p className="text">{homeSlider?.subTitle}</p>
          <div className="btn btn--primary btnmodal" onClick={openAuthenModal}>
            Bắt đầu học
          </div>
        </div>
      </div>
      <div className="hero__bottom">
        <div className="container-fluid">
          <div className="hero__bottom-social">
            <a href="https://www.facebook.com/cfdcircle" target="_blank">
              <img src="/img/icon-facebook.svg" alt="Facebook CFD" />
            </a>
            <a href="https://www.youtube.com/cfdcircle" target="_blank">
              <img src="/img/icon-youtube.svg" alt="Youtube CFD" />
            </a>
          </div>
        </div>
      </div>
      <div className="hero__background">
        <img
          className="hero__background-img"
          src="/img/bg-hero-home.jpg"
          alt="CFD Training Background"
        />
        <div
          className="hero__background-video"
          data-src="video/CFD-video-bg2.mp4"
        />
      </div>
    </section>
  );
};

export default HomeSlider;
