import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <div>
      <p>loading...</p>
    </div>
  ) : user ? (
    <div>
      {/* <UserMenu /> */}
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace state={{ redirectUrl: window.location.pathname }} /> //state redirect user back to original request
  );
};

export default AppContainer;
