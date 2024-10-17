import { IconType } from "react-icons";
import { FaHome, FaBell, FaUser, FaPen, FaStar } from "react-icons/fa";

export interface NavItem {
  id: number;
  label: string;
  path: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: FaHome,
  },
  {
    id: 2,
    label: "Create Post",
    path: "/create-post",
    icon: FaPen,
  },
  {
    id: 3,
    label: "Notifications",
    path: "/notifications",
    icon: FaBell,
  },
  {
    id: 4,
    label: "Profile",
    path: "/profile",
    icon: FaUser,
  },
  {
    id: 5,
    label: "Premium",
    path: "/premium",
    icon: FaStar,
  },
];
