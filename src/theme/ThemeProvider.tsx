import { ReactNode } from "react";
import { ConfigProvider } from "antd";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeSettings = {
    components: {
      Button: {
        defaultHoverBg: "none",
        defaultHoverBorderColor: "none",
        defaultHoverColor: "none",
      },
    },
  };

  return <ConfigProvider theme={themeSettings}>{children}</ConfigProvider>;
};
