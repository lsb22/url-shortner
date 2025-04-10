import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import apiClient from "../services/api-client";

const schema = z.object({
  // for schema based form validation
  email: z.string().min(10, { message: "Enter valid email" }),
  password: z
    .string()
    .min(8, { message: "password can't be lesser than 8 characters." }),
});

type LoginData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const handleLoginClick = (data: LoginData) => {
    apiClient
      .post("/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/home/" + data.email);
      })
      .catch((err) => {
        alert(err.response.data.messsage);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <form
        className="border-2 border-white rounded-md px-15 py-10 min-w-md"
        onSubmit={handleSubmit((data) => {
          handleLoginClick(data);
          reset();
        })}
      >
        <div className="flex flex-col">
          <div className="mt-5 mb-5">
            <p className="text-3xl font-bold">login</p>
            <p>Please enter your details below.</p>
          </div>
          <div>
            <div className="mb-5 flex flex-col">
              <label htmlFor="" className="text-lg">
                Email Address
              </label>
              <input
                className="border-1 rounded-sm p-1 bg-white text-black"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-5 flex flex-col">
              <label htmlFor="" className="text-xl">
                Password
              </label>
              <input
                className="border-1 rounded-sm p-1 bg-white text-black"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-400">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <button
              className="bg-white text-black pt-2 pb-2 pr-3 pl-3 border-3 rounded-md"
              type="submit"
            >
              Submit
            </button>
            {/* <Button onClick={handleRegisterClick}>Register</Button>
            <Button onClick={handleAgentLogin}>Agent Login</Button> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
