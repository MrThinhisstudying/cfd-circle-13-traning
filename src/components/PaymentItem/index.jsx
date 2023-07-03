import React from "react";
import { formatCurrency, formatTimeDisplay } from "../../utils/format";

const PaymentItem = ({ course, paymentMethod, updatedAt }) => {
  return (
    <div className="itemhistory">
      <div className="name">{course?.name}</div>
      <div className="payment">{paymentMethod}</div>
      <div className="date">{formatTimeDisplay(updatedAt)}</div>
      <div className="money">{formatCurrency(course?.price || "")}</div>
    </div>
  );
};

export default PaymentItem;
