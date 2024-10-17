"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/theme";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AntdRegistry>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </AntdRegistry>
  );
};
