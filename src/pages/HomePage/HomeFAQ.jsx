import React from "react";
import AccordionItem from "../../components/Accordion";

const HomeFAQ = ({ questions }) => {
  return (
    <section className="faq --scpadding">
      <div className="container">
        <div className="faq__inner">
          <div className="heading --noline --center">
            <h2 className="heading__title title --t2">
              Câu hỏi <span className="color--primary">thường gặp</span>
            </h2>
          </div>
          <div className="faq__list">
            <AccordionItem
              title="Thông tin chung"
              data={questions?.slice(0, 6)}
              renderTitle={(question) => question?.question}
              renderContent={(question) => question?.answer}
            />
            <AccordionItem
              title="Đắng ký, thanh toán, ưu đãi"
              data={questions?.slice(6, 9)}
              renderTitle={(question) => question?.question}
              renderContent={(question) => question?.answer}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
