import React, { CSSProperties, HTMLAttributes } from "react";
import { ColorKey, TextStyles, TextVariant } from "../../../theme";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  className?: string;
  color?: ColorKey;
  style?: CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  variant = "body",
  children,
  className = "",
  color,
  ...props
}) => {
  const variantClassName = TextStyles[variant];
  const textStyle = `${variantClassName} ${className} block  ${
    color ? `text-${color}` : ""
  }`;

  return (
    <span className={textStyle} {...props}>
      {children}
    </span>
  );
};
