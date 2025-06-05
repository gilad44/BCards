import { joiResolver } from "@hookform/resolvers/joi";
import { default as axios } from "axios";
import { Button } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyFloatingLabel from "../comps/MyFloatingLabel";
import { buttonTheme } from "../data/themes";
import { userActions } from "../slices/userSlice";
import LoginData from "../types/LoginData";
import { loginSchema } from "../Validations/login.joi";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFormData: LoginData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    defaultValues: initialFormData,
    mode: "all",
    resolver: joiResolver(loginSchema),
  });

  const submitForm = async (form: LoginData) => {
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form,
      );
      localStorage.setItem("token", token.data);

      const parsedToken = jwtDecode(token.data) as { _id: string };
      axios.defaults.headers.common["x-auth-token"] = token.data;

      toast.success("Login successful!");

      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
          parsedToken._id,
      );
      dispatch(userActions.login(res.data));
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Login failed");
      }
    }
  };

  return (
    <>
      <div className="loginFormMain">
        <h1 className="formTitle">Login</h1>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="loginForm"
        >
          <MyFloatingLabel
            name="email"
            label="Email"
            register={register}
            errors={errors}
          />

          <MyFloatingLabel
            name="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          {errors.password && (
            <p className="text-fluid-xs text-red-500">
              {errors.password.message}
            </p>
          )}
          <Button
            theme={buttonTheme}
            size="lg"
            disabled={!isValid}
            type="submit"
            className="loginSubmit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
