import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "layouts/MainLayout/MainLayout";
import Page_connexion from "layouts/Page_connexion";
import routes from "routes";
import ProtectedRoute from "./ProtectedRoute";

const getRoutes = (allRoutes) =>
  allRoutes.map((route) => <Route key={route.key} path={route.route} element={route.component} />);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page_connexion />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/main" element={<MainLayout />}>
          {getRoutes(routes)}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
