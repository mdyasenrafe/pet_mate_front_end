"use client";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const verifyToken = (token: string) => {
  return jwtDecode(token);
};

export const retrieveAndDecodeToken = () => {
  const token = Cookies.get("token");

  if (token) {
    try {
      return verifyToken(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  } else {
    console.log("No token found in cookies.");
  }
};
