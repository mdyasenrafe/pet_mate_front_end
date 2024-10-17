import React from "react";
import { Navbar } from "../Navbar";
import { getDarkMode } from "../../../redux/features/theme";
import { useAppSelector } from "../../../redux";
import { Footer } from "../Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isDarkMode = useAppSelector(getDarkMode);

  return (
    <section className={`${isDarkMode ? "dark bg-black" : "bg-white"}`}>
      <Navbar />
      <React.Fragment>
        <div>{children}</div>
      </React.Fragment>
      <Footer />
    </section>
  );
};
