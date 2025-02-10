import React, { forwardRef, useId } from "react";

function SelectField({ options = [], label="", selectFieldClasses = "", labelClasses = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className={labelClasses} >{label}</label>}
      <select id={id} ref={ref} className={`${selectFieldClasses}`} {...props}>
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
