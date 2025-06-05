import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import RouteGuardProps from "../types/RouteGuardProps";

const RouteGuard = (props: RouteGuardProps) => {
  const { children, isBiz, isAdmin } = props;
  const user = useSelector((state: RootState) => {
    return state.userSlice.user;
  });
  if (isBiz && !user?.isBusiness) {
    return <Navigate to="/" />;
  }
  if (isAdmin && !user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RouteGuard;
