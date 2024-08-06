import ResetPasswordForm from "@/components/resetPasswordForm";
import { Link, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();

  const linkIsValid = code && exp && exp > now;

  return (
    <>
      {linkIsValid ? (
        <ResetPasswordForm code={code} />
      ) : (
        <div>
          <p>invalid link</p>
          <Link to="/password/forgot">Request new password reset link</Link>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
