import { ReactNode, useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useGeneralStore } from "../stores/generalStore";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state);
  const navigate = useNavigate();
  const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen);
  useEffect(() => {
    if (!user.id) {
      navigate("/");
      setLoginIsOpen(true);
    }
  }, [user.id, navigate, setLoginIsOpen]);

  if (!user.id) {
    return <>No Access</>;
  }

  return <>{children}</>;
};
export default ProtectedRoutes;
