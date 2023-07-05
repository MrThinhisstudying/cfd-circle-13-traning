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
            Học Viện Đào Tạo
            <br />
            Lập Trình Front-End Thực Chiến
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
        <div className="hero__background-video" />
        <video preload="none" autoPlay loop muted playsInline>
          <source src="/video/CFD-video-bg2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default HomeSlider;
