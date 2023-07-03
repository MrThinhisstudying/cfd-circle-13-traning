import React from "react";

const TeamItem = (teams) => {
  const { name, jobTitle, image } = teams || "";
  return (
    <div className="teacher__list-item">
      <div className="img">
        <img src={image} alt="Giảng viên CFD" />
      </div>
      <div className="info">
        <p className="label">{jobTitle}</p>
        <h3 className="title --t3">{name}</h3>
      </div>
    </div>
  );
};

export default TeamItem;
