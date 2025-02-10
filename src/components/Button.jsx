import React from "react";

function Button({
  children,
  type = "submit",
  textColor = "text-white",
  bgColor = "bg-blue-600",
  classname = "",
  ...props
}) {
  return (
    <button
      type={type}
            className={`px-4 py-3 rounded-lg w-full ${bgColor} ${textColor} ${classname} 
      hover:bg-opacity-80 transition duration-200`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
