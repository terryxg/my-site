import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/api";

const Navbar = () => {
  const navigate = useNavigate();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });

  return (
    <div>
      <Link to="/settings">settings</Link>
      {/* //onClick=navigate"/settings */}
      <div onClick={() => signOut()}>logout</div>
    </div>
  );
};

export default Navbar;
