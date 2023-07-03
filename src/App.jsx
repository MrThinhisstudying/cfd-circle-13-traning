import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PATHS } from "./contant/pathnames";
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const Page404 = lazy(() => import("./pages/Page404"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProfileLayout = lazy(() => import("./layout/ProfileLayout"));
const MyInfo = lazy(() => import("./pages/ProfilePage/MyInfo"));
const MyCourse = lazy(() => import("./pages/ProfilePage/MyCourse"));
const MyPayment = lazy(() => import("./pages/ProfilePage/MyPayment"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const CourseOrder = lazy(() => import("./pages/CourseOrder"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path={PATHS.CONTACT} element={<ContactPage />}></Route>
          <Route path={PATHS.COURSES} element={<CoursePage />}></Route>
          <Route path={PATHS.COURSES_DETAIL} element={<CourseDetail />}></Route>
          <Route
            path={PATHS.COURSES_REGISTER}
            element={<CourseOrder />}
          ></Route>
          <Route path={PATHS.ABOUT} element={<AboutPage />}></Route>
          <Route path={PATHS.BLOG} element={<BlogPage />}></Route>
          <Route element={<PrivateRoute redirecPath="/contact" />}>
            <Route path={PATHS.PROFILE.INDEX} element={<ProfileLayout />}>
              <Route index element={<MyInfo />}></Route>
              <Route
                path={PATHS.PROFILE.COURSES}
                element={<MyCourse />}
              ></Route>
              <Route
                path={PATHS.PROFILE.PAYMENT}
                element={<MyPayment />}
              ></Route>
            </Route>
          </Route>
          <Route path="*" element={<Page404 />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
