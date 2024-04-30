import { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

interface IProtectedPage {
  children: React.ReactNode;
}
export default function HostOnlyPage({ children }: IProtectedPage) {
  const { user, userLoading } = useUser();
  const nav = useNavigate();

  useEffect(() => {
    if (!user?.is_host) {
      nav("/");
    }
  }, [userLoading, user, nav]);

  return <>{children}</>;
}
