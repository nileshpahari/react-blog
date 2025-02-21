import React, { forwardRef, useId } from "react";

const Input = forwardRef(function (
  {
    type = "text",
    label = "",
    placeholder = "",
    labelClasses,
    inputClasses,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={` focus:ring focus:ring-blue-500 focus:border-blue-500 transition ${labelClasses} `}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${inputClasses}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
