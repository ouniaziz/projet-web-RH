import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "layouts/MainLayout/MainLayout";
import Page_connexion from "features/Auth/views/Page_connexion";
import routes from "routes";
import ProtectedRoute from "./ProtectedRoute";
import Page_reset from "features/reset_password/views/Page_reset";
import ActivateAccount from "features/ActivateAccount/views/Page_activation";


const getRoutes = (allRoutes) =>
  allRoutes.map((route) => <Route key={route.key} path={route.route} element={route.component} />);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page_connexion />} />
      <Route path="/activation_compte" element={<ActivateAccount />} />
      <Route path="/reset_password" element={<Page_reset />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<MainLayout />}>
          {getRoutes(routes)}
        </Route>
      </Route>
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}
// {
//   type: "collapse",
//   name: "Profile",
//   key: "main/profile",
//   icon: <Icon fontSize="small">person</Icon>,
//   route: "profile",
//   component: <Profile />,
// },