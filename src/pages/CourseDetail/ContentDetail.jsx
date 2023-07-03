import React from "react";
import { formatTimeDisplay } from "../../utils/format";
import ItemTeacher from "./ItemTeacher";
import { useState } from "react";
import AccordionItem from "../../components/Accordion";

const ContentDetail = (courseDetail) => {
  const { schedule, required, teams } = courseDetail?.courseDetail || {};
  const [show, setShow] = useState(false);
  const showAccordion = () => {
    setShow(true);
  };
  return (
    <section className="contentdetail">
      <div className="content">
        <div className="container">
          <div className="contentrow ctintro">
            <h3 className="contentrow__title title --t3">Giới thiệu</h3>
            <div className="contenteditor">
              <h2
                style={{
                  fontSize: "inherit",
                  margin: "inherit",
                  fontFamily: "inherit",
                  lineHeight: "inherit",
                }}
              >
                Khoá học LẬP TRÌNH FRONT-END MASTER này phù hợp với những bạn
                đang là sinh viên ngành IT hoặc trái ngành muốn trở thành Lập
                Trình Viên Front-end Chuyên Nghiệp để đi làm tại các công ty
                nhưng không thể tự học hoặc tự học nhưng chưa thể ứng dụng và
                hoàn thiện dự án thực tế một cách tốt nhất. Khoá học FRONT-END
                MASTER chính là lựa chọn phù hợp nhất với bạn. Đội ngũ CFD
                Circle sẽ giúp bạn có đầy đủ kiến thức, kinh nghiệm kỷ năng cần
                thiết bằng việc giảng dạy giúp bạn hoàn thành được ít nhất 5-6
                dự án thực tế. Ngoài những kiến thức thì bạn sẽ tích luỹ được
                rất nhiều kinh nghiệm thực tế trong quá trình học và làm dự án
                để dễ dàng ứng tuyển thành công.
              </h2>
              <h3>
                <strong>
                  Khoá học FRONTEND MASTER được chia làm 3 giai đoạn chính:
                </strong>
              </h3>
              <p>
                - <strong>FRONTEND NEWBIE</strong>: <strong>Thời lượng</strong>{" "}
                6 tuần (2 buổi/tuần). <strong>Thời gian học</strong> 18h45 -
                21h45 thứ 3, 7
              </p>
              <p>
                - <strong>WEB RESPONSIVE</strong>:<strong>Thời lượng</strong> 5
                tuần (3 buổi/tuần).
                <strong>Thời gian học</strong> 18h45 - 21h45 thứ 2,4,6
              </p>
              <p>
                - <strong>REACTJS MASTER:</strong> <strong>Thời lượng</strong> 6
                tuần (3 buổi/tuần).
                <strong>Thời gian học</strong> 18h45 - 21h45 thứ 2,4,6
              </p>
              <p>
                <strong>HÌNH THỨC HỌC: </strong>OFFLINE HOẶC ONLINE GOOGLE MEET
                CÙNG VỚI LỚP OFFLINE
              </p>
              <p>
                <strong>SỐ LƯỢNG HỌC VIÊN: </strong>15-20 học viên
              </p>
              <p style={{ color: "#00afab" }}>
                KHOÁ HỌC NÀY ĐANG CÓ ƯU ĐÃI{" "}
                <strong style={{ fontSize: "22px" }}>GIẢM GIÁ</strong> TỪ
                <strong style={{ fontSize: "22px" }}>
                  {" "}
                  15.400.000 VND
                </strong>{" "}
                CHỈ CÒN{" "}
                <strong style={{ fontSize: "22px" }}>14.700.000 VND.</strong>
              </p>
              <p style={{ color: "#00afab" }}>
                <strong style={{ fontSize: "22px" }}>GIẢM 200K</strong> CHO MỖI
                HỌC VIÊN HỌC THEO{" "}
                <strong style={{ fontSize: "22px" }}>NHÓM 2 NGƯỜI.</strong>
              </p>
              <p style={{ color: "#00afab" }}>
                <strong style={{ fontSize: "22px" }}>GIẢM 300K</strong> CHO MỖI
                HỌC VIÊN HỌC THEO{" "}
                <strong style={{ fontSize: "22px" }}>NHÓM TỪ 3 NGƯỜI</strong>{" "}
                TRỞ LÊN.
              </p>
              <div className="videowrap">
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/C7GoVPoamdM?rel=0"
                  width={560}
                  height={315}
                  frameBorder={0}
                  allowFullScreen="allowfullscreen"
                />
              </div>
            </div>
          </div>
          <div className="contentrow ctschedule">
            <h3 className="contentrow__title title --t3">Lịch học</h3>
            <div className="ctschedule__box">
              <div className="info">
                <div className="labeltext">
                  <span className="label --blue">Khai giảng</span>
                  <p className="title --t3">
                    {formatTimeDisplay(schedule?.startDate)}
                  </p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Ngày học</span>
                  <p className="title --t3">{schedule?.days}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Thời gian</span>
                  <p className="title --t3">{schedule?.time}</p>
                </div>
                <div className="labeltext">
                  <span className="label --blue">Địa điểm</span>
                  <p className="title --t3">{schedule?.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contentrow ctlession">
            <h3 className="contentrow__title title --t3">Nội dung khoá học</h3>
            <div className="accordion">
              <AccordionItem onClick={showAccordion} />
            </div>
          </div>
          <div className="contentrow ctrequest">
            <h3 className="contentrow__title title --t3">Yêu cầu cần có</h3>
            <div className="ctrequest__content">
              {required?.length > 0 &&
                required.map((data, index) => (
                  <p key={data?.id || index}>{data}</p>
                ))}
            </div>
          </div>
          <div className="contentrow ctteacher">
            <h3 className="contentrow__title title --t3">Giảng viên</h3>
            <div className="ctteacher__content">
              {teams?.length > 0 &&
                teams?.map((member, index) => (
                  <ItemTeacher key={member?.id || index} member={member} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentDetail;
