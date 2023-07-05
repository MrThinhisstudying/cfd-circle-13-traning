import React, { useState } from "react";

const AccordionItem = (props) => {
  const { title, data, renderTitle, renderContent } = props || {};
  const [active, setActive] = useState(null);
  return (
    <div className="accordion">
      {title && <h3 className="accordion__title label">{title}</h3>}
      {!!data?.length &&
        data?.map((item, index) => {
          return (
            <div
              key={item?.id || index}
              onClick={() =>
                setActive((prev) => (prev === item?.id ? null : item?.id))
              }
              className={`accordion__content ${
                active === item?.id ? "active" : ""
              }`}
            >
              <div className="accordion__content-title">
                <h4>
                  <strong>{renderTitle(item)}</strong>
                </h4>
              </div>
              <div className="accordion__content-text">
                {renderContent(item)}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AccordionItem;
