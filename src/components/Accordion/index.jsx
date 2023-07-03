import React from "react";

const AccordionItem = (courseDetail) => {
  const accordions = courseDetail?.courseDetail?.content || [];

  return (
    <div className="accordion__content">
      <div className="accordion__content-title">
        <h4>
          <strong>{accordions?.title}</strong>
        </h4>
      </div>
      <div
        className="accordion__content-text --transparent"
        style={{ display: "none" }}
      >
        {accordions?.description?.length > 0 &&
          accordions?.description.map((accordion, index) => (
            <div className="item --lock">
              <p>
                <i>
                  <img
                    src="https://cfdcircle.vn/img/iconlock.svg"
                    alt="CFD Circle"
                  />
                </i>
                <span>{accordion}</span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AccordionItem;
