import React from "react";
import { Roles } from "../../contant/roles";

const ItemTeacher = (member) => {
  return (
    <div className="itemteacher">
      <div className="itemteacher__avatar">
        <img src={member?.member?.image} alt="CFD Circle" />
      </div>
      <div className="itemteacher__info">
        <div className="itemteacher__info-name">
          <p className="title --t3">{member?.member?.name}</p>
          {member?.member.tags?.map((role) => {
            if (role?.includes(Roles.Teacher)) {
              return <span className="label badge --teacher">{role}</span>;
            } else {
              return <span className="label badge --mentor">{role}</span>;
            }
          })}
        </div>
        <h5 className="itemteacher__info-pos label">
          {member?.member?.jobTitle}
        </h5>
        <p className="itemteacher__info-des">{member?.member?.description}</p>
      </div>
    </div>
  );
};

export default ItemTeacher;
