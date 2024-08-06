import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { login } from "../api/api";
import { LoginParams } from "@/types/types";

export default function Login() {
  const schema = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginParams>({
    resolver: zodResolver(schema),
  });
  const fields = watch();
  const navigate = useNavigate();

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      reset();
      navigate("/dashboard", { replace: true });
    },
  });

  const onSubmit: SubmitHandler<LoginParams> = (data) => signIn(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isError && <p>Invalid email or password</p>}
        <input className="border-2" {...register("email")} />
        <p>{errors.email?.message}</p>
        <input
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)}
          className="border-2"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        {isPending ? (
          <button disabled type="submit">
            loading...
          </button>
        ) : (
          <button disabled={!fields} type="submit">
            submit
          </button>
        )}
      </form>
      <Link to="/password/forgot">Forgot password</Link>
    </>
  );
}
