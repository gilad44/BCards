import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { Button, Checkbox, Label } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyFloatingLabel from "../comps/MyFloatingLabel";
import { userActions } from "../slices/userSlice";
import SignupData from "../types/SignupData";
import { signupSchema } from "../Validations/signup.joi";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFormData: SignupData = {
    email: "",
    password: "",
    name: {
      first: "",
      middle: "",
      last: "",
    },
    phone: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
    isBusiness: false,
    isAdmin: false,
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm<SignupData>({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(signupSchema),
  });

  // Force validation on mount
  useEffect(() => {
    trigger();
  }, [trigger]);

  const submitForm = async (form: SignupData) => {
    try {
      //////////////////// **** Auto Login ***** ////////////////////////
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        { email: form.email, password: form.password },
      );
      localStorage.setItem("token", token.data);
      const parsedToken = jwtDecode(token.data) as { _id: string };

      axios.defaults.headers.common["x-auth-token"] = token.data;

      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
          parsedToken._id,
      );

      dispatch(userActions.login(res.data));

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as { message?: string };
        console.error("Registration error:", errorData);

        toast.error(
          `Registration failed: ${errorData?.message || "Unknown error"}`,
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("Registration failed");
      }
    }
  };

  return (
    <>
      <div className="formMain">
        <h1 className="formTitle">Signup</h1>
        <form onSubmit={handleSubmit(submitForm)} className="form">
          <div className="formBody">
            {/* Left column */}
            <div className="leftColumn">
              <MyFloatingLabel
                name="name.first"
                label="First name"
                register={register}
                errors={errors}
              />

              <MyFloatingLabel
                name="name.middle"
                label="Middle name"
                register={register}
                errors={errors}
              />

              <MyFloatingLabel
                name="name.last"
                label="Last name"
                register={register}
                errors={errors}
              />

              <MyFloatingLabel
                name="phone"
                label="Phone no."
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="image.url"
                label="Photo"
                usePlaceholder={true}
                type="url"
                placeholder="File path"
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="image.alt"
                label="Photo description"
                register={register}
                errors={errors}
              />

              <MyFloatingLabel
                name="address.state"
                label="state"
                register={register}
                errors={errors}
              />

              <div className="my-2 mr-16 flex items-center gap-1">
                <Checkbox
                  id="business"
                  {...register("isBusiness")}
                  className="size-6"
                />

                <Label htmlFor="business">Business user</Label>
              </div>
            </div>

            {/* Right column */}
            <div className="rightColumn">
              <MyFloatingLabel
                name="address.country"
                label="Country"
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="address.city"
                label="City"
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="address.street"
                label="Street"
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="address.houseNumber"
                label="House number"
                type="number"
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="address.zip"
                label="Zip code"
                type="number"
                register={register}
                errors={errors}
              />
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
            </div>
          </div>
          <div className="formButtons">
            <Button type="button" className="reset" onClick={() => reset()}>
              Reset
            </Button>
            <Button disabled={!isValid} type="submit" className="submit">
              Submit
            </Button>
          </div>
          <div className="flex w-full items-center justify-center py-5 "></div>
        </form>
      </div>
    </>
  );
};

export default Signup;
