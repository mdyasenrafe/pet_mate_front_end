import { CommonLayout } from "@/components/layouts";
import { TProps } from "@/types";

const Layout: React.FC<TProps> = ({ children }) => {
  return <CommonLayout>{children}</CommonLayout>;
};

export default Layout;
