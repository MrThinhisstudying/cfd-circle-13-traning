import React from "react";
import useQuery from "../../hooks/useQuery";
import { teamService } from "../../services/teamService";
import TeamItem from "../../components/TeamItem";

const HomeTeams = () => {
  const { data, loading, error, refetch } = useQuery((query) =>
    teamService.getTeam(query)
  );
  const Teachers = data?.teams || "";
  return (
    <section className="teacher --scpadding">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Đội Ngũ <span className="color--primary">CFD Circle</span>
          </h2>
          <div className="heading__content">
            <p className="text">
              Đội ngủ giảng viên và mentor tâm huyết nhiều kinh nghiệm được tích
              luỹ từ những dự án thực tế sẽ đồng hành cùng bạn xuyên suốt quá
              trình học và con đường phát triển sự nghiệp.
            </p>
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
      </div>
      <div className="teacher__list">
        <div className="container">
          <div className="teacher__list-inner">
            {Teachers?.length > 0 &&
              Teachers.map((teacher, index) => {
                return <TeamItem key={teacher?.id || index} {...teacher} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTeams;
