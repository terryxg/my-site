import { Link } from "react-router-dom";
import { resetPassword } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  password: string;
};

const ResetPasswordForm = ({ code }: { code: string }) => {
  const schema = z
    .object({
      password: z.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const fields = watch();

  const {
    mutate: resetUserPassword,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: resetPassword,
  });

  const onSubmit: SubmitHandler<Inputs> = (password) =>
    resetUserPassword({ ...password, verificationCode: code });
  return (
    <>
      {isSuccess ? (
        <div>
          <p>Password updated successfully!</p>
          <Link to="/login">go to login</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {isError && <p> An error occured</p>}
          <input
            className="border-2"
            {...register("password")}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)}
          />
          <p>{errors.password?.message}</p>

          {isPending ? (
            <button disabled type="submit">
              loading...
            </button>
          ) : (
            <button disabled={!fields} type="submit">
              Reset password
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default ResetPasswordForm;
