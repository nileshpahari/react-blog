import React, { forwardRef, useId } from "react";

const Input = forwardRef(function ({
  type = "text",
  label = "",
  classname,
  ...props
}, ref) {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`${classname}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
