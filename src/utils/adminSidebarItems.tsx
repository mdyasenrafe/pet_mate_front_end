import { MdDashboard } from "react-icons/md";
import { FaUserCircle, FaClipboardList, FaUsers } from "react-icons/fa";

export const adminRoutes = [
  {
    id: 6.1,
    name: "Home",
    path: "/",
    icon: MdDashboard,
  },
  {
    id: 6.2,
    name: "Profile",
    path: "/dashboard/admin/profile",
    icon: FaUserCircle,
  },
  {
    id: 6.3,
    name: "Post Management",
    path: "/dashboard/admin/post-management",
    icon: FaClipboardList,
  },
  {
    id: 6.4,
    name: "User Management",
    path: "/dashboard/admin/user-management",
    icon: FaUsers,
  },
];
