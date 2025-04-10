import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";

interface Props {
  children: ReactNode;
}
const ProtectedRoutes = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, []);

  if (isLoggedIn === null) return <div className="">Loading....</div>;
  if (isLoggedIn === false) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoutes;
