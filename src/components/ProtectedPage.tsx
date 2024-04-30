import { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

interface IProtectedPage {
  children: React.ReactNode;
}
export default function ProtectedPage({ children }: IProtectedPage) {
  const { user, isLoggedId, userLoading } = useUser();
  const nav = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedId) {
        nav("/");
      }
    }
  }, [userLoading, isLoggedId, nav]);

  return <>{children}</>;
}
