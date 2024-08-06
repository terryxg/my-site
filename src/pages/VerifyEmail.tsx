import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { verifyEmail } from "../api/api";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const { code } = useParams();

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code as string),
  });

  return (
    <div>
      {isPending ? (
        <div>loading...</div>
      ) : (
        <div>{isSuccess ? "Email verified" : "invalid link"}</div>
      )}
      <div>{isError && "The link is invalid or expired"}</div>
      <Link to="/password/reset" replace>
        get a new link
      </Link>
      <Link to="/dashboard" replace>
        go to dashboard
      </Link>
    </div>
  );
};

export default VerifyEmail;
