import { NavItem } from "@/types";
import {
  FaHome,
  FaBell,
  FaUser,
  FaPen,
  FaStar,
  FaTachometerAlt,
} from "react-icons/fa";
import { LuHome, LuPlusCircle } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

export const navItems: NavItem[] = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: LuHome,
    desktop: true,
  },
  {
    id: 2,
    label: "Search",
    path: "/search",
    icon: CiSearch,
    desktop: true,
  },
  {
    id: 3,
    label: "Post",
    path: "/create-post",
    icon: LuPlusCircle,
    desktop: false,
  },
  {
    id: 4,
    label: "Premium",
    path: "/premium",
    icon: FaStar,
    desktop: true,
  },
];

export const commonItems = [
  {
    id: 5,
    label: "Profile",
    path: "/profile",
    icon: FaUser,
    desktop: true,
  },
];

export const adminItems = [
  {
    id: 6,
    label: "Dashobard",
    path: "/dashboard",
    icon: FaTachometerAlt,
    desktop: true,
  },
];
