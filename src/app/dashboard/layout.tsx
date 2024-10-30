import { AdminDashboardLayout } from "@/components/layouts";
import { TProps } from "@/types";
import React from "react";

const layout: React.FC<TProps> = ({ children }) => {
  return <AdminDashboardLayout children={children} />;
};

export default layout;
