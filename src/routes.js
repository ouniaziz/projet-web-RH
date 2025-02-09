import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "statistiques des utilisateurs ",
    key: "main/dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "utilisateurs",
    key: "main/utilisateurs",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "utilisateurs",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Documents Administratifs",
    key: "main/DocumentsAdministratifs",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "DocumentsAdministratifs",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "main/notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "main/profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "profile",
    component: <Profile />,
  },
];

export default routes;
