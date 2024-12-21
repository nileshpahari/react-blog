import React, { forwardRef, useId } from "react";

function SelectField({ options = [], label, classname = "", ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}></label>}
      <select id={id} ref={ref} className={`${classname}`} {...props}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(SelectField);
