import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label || ""}
      </label>
      <input
        {...props}
        type={props.type || "text"}
        className="form-control"
        id={props.id}
        ref={ref}
        placeholder={props.placeholder || ""}
      />
    </div>
  );
});

export default Input;
