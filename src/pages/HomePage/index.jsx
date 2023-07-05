import React from "react";
import HomeCourses from "./HomeCourses";
import HomeFeatured from "./HomeFeatured";
import HomeSlider from "./HomeSlider";
import HomeCourseComing from "./HomeCourseComing";
import TeamItem from "../../components/TeamItem";
import HomeTeams from "./HomeTeams";
import useQuery from "../../hooks/useQuery";
import { servicesCourse } from "../../services/servicesCourse";
import { teamService } from "../../services/teamService";
import HomeTestimonial from "./HomeTestimonial";
import HomeFAQ from "./HomeFAQ";
import { homeService } from "../../services/homeService";
import HomeGallery from "./HomeGallery";
import HomeCallRegister from "./HomeCallRegister";
import useDebounce from "../../hooks/useDebounce";
import PageLoading from "../../components/Loading";

const HomePage = () => {
  const { data: commingCourses, loading: loadingComingCourse } = useQuery(() =>
    servicesCourse.getCourses()
  );
  const { data: teams, loading: loadingTeams } = useQuery((query) =>
    teamService.getTeam(query)
  );
  const { data: questionsData, loading: loadingQuestions } = useQuery(() =>
    homeService.getFAQ()
  );
  const { data: galleryData, loading: loadingGallery } = useQuery(() =>
    homeService.getGallery()
  );
  const allLoading =
    loadingComingCourse || loadingTeams || loadingQuestions || loadingGallery;
  const isLoading = useDebounce(allLoading, 1000);
  if (!!isLoading) return <PageLoading />;
  return (
    <main className="mainwrapper">
      <HomeSlider />
      <HomeCourseComing commingCourses={commingCourses} />
      <HomeCourses />
      <HomeTeams teams={teams} loading={loadingTeams} />
      <HomeFeatured />
      <HomeTestimonial />
      <HomeFAQ questions={questionsData?.questions} />
      <HomeGallery images={galleryData?.galleries?.[0]?.images || []} />
      <HomeCallRegister />
    </main>
  );
};

export default HomePage;
