import { NavItem } from "@/types";
import { FaHome, FaBell, FaUser, FaPen, FaStar } from "react-icons/fa";
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
    label: "Feed",
    path: "/feed",
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
  {
    id: 5,
    label: "Profile",
    path: "/profile",
    icon: FaUser,
    desktop: true,
  },
];
