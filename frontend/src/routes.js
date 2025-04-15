import Dashboard from "features/Dashboard";
import TableEnseignants from "./features/Enseignants";
import TableEmployes from "./features/Employes";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile_enseignant from "./layouts/profile_enseignant";
import Mes_taches from "./layouts/mes_taches";
import ProfilePage from "./layouts/user_profile";
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
    key: "main/employes",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "employes",
    component: <TableEmployes />,
  },
  {
    type: "collapse",
    name: "Enseignants",
    key: "main/enseignants",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "enseignants",
    component: <TableEnseignants />,
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
    key: "main/profile_enseignant",
    route: "profile_enseignant",
    component: <Profile_enseignant />,
  },
  {
    key: "main/Mes_taches",
    route: "Mes_taches",
    component: <Mes_taches />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "main/mon_profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "mon_profile",
    component: <ProfilePage />,
  },
];

export default routes;
