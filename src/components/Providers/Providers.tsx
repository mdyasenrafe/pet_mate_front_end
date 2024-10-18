"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/theme";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AntdRegistry>
      <Provider store={store}>
        <Toaster position="top-center" />
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </AntdRegistry>
  );
};
