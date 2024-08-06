import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { sendPasswordResetEmail } from "../api/api";
import { SendPasswordResetParams } from "@/types/types";

export default function ForgotPassword() {
  const schema = z
    .object({
      email: z.string().email(),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SendPasswordResetParams>({
    resolver: zodResolver(schema),
  });
  const fields = watch();

  const {
    mutate: sendPasswordReset,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
    /*  onSuccess: () => {
      reset();
      navigate("/dashboard", { replace: true });
    }, */
  });

  const onSubmit: SubmitHandler<SendPasswordResetParams> = (email) => sendPasswordReset(email);

  return (
    <>
      {isSuccess ? (
        <div>Email sent! check your inbox for further instructions</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {isError && <p> Invalid email or password</p>}
          <input
            className="border-2"
            {...register("email")}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)}
          />
          <p>{errors.email?.message}</p>

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
}
