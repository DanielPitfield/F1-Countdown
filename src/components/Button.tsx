import React, { MouseEventHandler } from "react";

interface ButtonProps {
  mode: "destructive" | "accept" | "default";
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`btn ${props.mode}`}
      onClick={(e) => {
        props.onClick?.(e);
      }}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
