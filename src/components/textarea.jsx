import { forwardRef } from "react";

const Textarea = forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <textarea
        {...props}
        className="form-control"
        id={props.id}
        rows="3"
        ref={ref}
      ></textarea>
    </div>
  );
});

export default Textarea;
