import { Navigate, Outlet } from "react-router-dom";
import {useStore} from "./service/store";

export default function ProtectedRoute() {

  const isAuthenticated = useStore(state=>state.isAuthenticated)
  console.log("Auth Status:", isAuthenticated); // Debugging
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
