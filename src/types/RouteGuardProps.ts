import { ReactNode } from "react";

type RouteGuardProps = {
  children: ReactNode;
  isBiz: boolean;
  isAdmin: boolean;
};

export default RouteGuardProps;
