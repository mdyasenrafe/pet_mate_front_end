import React from "react";
import { Button as AButton, ButtonProps as AntButtonProps } from "antd";
import { ReactNode } from "react";
import { ColorKey, colors } from "../../../theme";

interface ButtonProp extends Omit<AntButtonProps, "type"> {
  customColor?: ColorKey;
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProp> = ({
  children,
  customColor,
  icon,
  ...props
}) => {
  const style = customColor
    ? {
        backgroundColor: colors[customColor],
        borderColor: colors[customColor],
        color: customColor === "white" ? "black" : "white",
        fontSize: 16,
      }
    : { fontSize: 16 };

  return (
    <AButton {...props} icon={icon} style={style}>
      {children}
    </AButton>
  );
};
