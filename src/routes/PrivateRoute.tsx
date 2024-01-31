import { type ReactElement } from "react";
import { Navigate } from "react-router";

interface Props {
  children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  // If theres time setup authentication something like
  // const { isAuthenticated } = useAuthStore((state) => state);
  // return isAuthenticated ? children : <Navigate to="/" />;
  return <Navigate to="/" />;
};

export default PrivateRoute;
