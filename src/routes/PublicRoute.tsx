import { type ReactElement } from "react";

interface Props {
  children: ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  return children;
};

export default PublicRoute;
