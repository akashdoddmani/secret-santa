import React from "react";

const Button = ({
  children,
  onClick = () => {},
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      className={`text-sm text-white flex flex-row gap-2 w-full items-center justify-center rounded-md p-2 cursor-pointer ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
