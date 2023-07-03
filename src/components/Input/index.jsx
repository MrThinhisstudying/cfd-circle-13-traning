import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label, required, renderProps, ...inputProps }, ref) => {
    return (
      <>
        <label className="label">
          {label} {required && <span>*</span>}
        </label>
        {renderProps ? (
          renderProps(inputProps)
        ) : (
          <input
            ref={ref}
            {...inputProps}
            className={`form__input ${!!inputProps.error ? "formerror" : ""}`}
          />
        )}
        <p className="error">{inputProps.error || ""}</p>
      </>
    );
  }
);

export default Input;
