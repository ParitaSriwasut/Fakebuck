import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export default function RedirectIfAuthenticated({ children }) {
  const { authUser } = useAuth(); //{id,firstName}
  if (authUser) {
    return <Navigate to="/" />;
  }
  return children;
}
