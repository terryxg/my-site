import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { signup } from "../api/api";
import { RegisterParams } from "@/types/types";

export default function Register() {
  const schema = z
    .object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterParams>({
    resolver: zodResolver(schema),
  });
  const fields = watch();
  const navigate = useNavigate();

  const {
    mutate: signUp,
    isPending,
    isError,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      reset();
      navigate("/dashboard", { replace: true });
    },
  });

  const onSubmit: SubmitHandler<RegisterParams> = (data) => signUp(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isError && <p>Invalid email or password</p>}
        <input className="border-2" {...register("email")} />
        <p>{errors.email?.message}</p>
        <input className="border-2" {...register("firstName")} />
        <p>{errors.firstName?.message}</p>
        <input className="border-2" {...register("lastName")} />
        <p>{errors.lastName?.message}</p>
        <input className="border-2" {...register("password")} />
        <p>{errors.password?.message}</p>
        <input
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)}
          className="border-2"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>

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
      <Link to="/login">Login</Link>
    </>
  );
}
