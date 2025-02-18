import Dashboard from "features/Dashboard";
import Table_employés from "layouts/table_employes";
import Table_enseignants from "layouts/table_enseignants";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "dashboard ",
    key: "main/dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Employés",
    key: "main/eployes",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "employes",
    component: <Table_employés />,
  },
  {
    type: "collapse",
    name: "Enseignants",
    key: "main/enseignants",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "enseignants",
    component: <Table_enseignants />,
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
