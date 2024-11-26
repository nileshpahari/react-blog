import React from "react";

function Button({
  children,
  type = "button",
  textColor = "text-white",
  bgColor = "bg-blue-600",
  classname = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
