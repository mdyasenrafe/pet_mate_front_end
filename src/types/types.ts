import { ReactNode } from "react";
import { IconType } from "react-icons";

export type TProps = {
  children: ReactNode;
};

export type NavItem = {
  id: number;
  label: string;
  path: string;
  icon: IconType;
  desktop: boolean;
};
