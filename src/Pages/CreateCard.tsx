import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import MyFloatingLabel from "../comps/MyFloatingLabel";
import { buttonTheme } from "../data/themes";
import { TCard } from "../types/TCard";
import { createCardsSchema } from "../Validations/createCardSchema.joi";
const CreateCard = () => {
  const navigate = useNavigate();
  const initialFormData: TCard = {
    title: "",
    subtitle: "",
    email: "",
    phone: "",
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
    description: "",
    web: "",
    image: {
      url: "",
      alt: "",
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TCard>({
    defaultValues: initialFormData,
    mode: "all",
    resolver: joiResolver(createCardsSchema),
  });
  const submitForm = async (form: TCard) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to log in to create a card");
        navigate("/login");
        return;
      }
      axios.defaults.headers.common["x-auth-token"] = token;

      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        form,
      );
      toast.success("Card created successfully!");
      navigate("/my-cards");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as { message?: string };

        toast.error(
          `Failed to create card: ${errorData?.message || "Unknown error"}`,
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("Failed to create card");
      }
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-start rounded-xl bg-gradient-to-b from-sky-800 to-blue-300 shadow-2xl shadow-gray-500">
        <form
          className="mb-fluid-md flex flex-col items-center px-fluid-xl "
          onSubmit={handleSubmit(submitForm)}
        >
          <h1 className="formTitle">Create Card</h1>
          <div className="flex w-full justify-center gap-20 pt-fluid-sm ">
            {/* Left column */}
            <div className="flex h-full w-1/3 flex-col items-center justify-center">
              <MyFloatingLabel
                name="title"
                label="Card Title"
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="subtitle"
                label="Subtitle"
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="description"
                label="Description"
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="phone"
                label="Phone Number"
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
                name="web"
                label="Website"
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="image.url"
                label="Image URL"
                register={register}
                errors={errors}
              />
            </div>
            {/* Right column */}
            <div className="flex h-full w-1/3 flex-col items-center justify-center ">
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
                register={register}
                errors={errors}
              />
              <MyFloatingLabel
                name="address.zip"
                label="Zip code"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-fluid-lg pt-fluid-xs">
            <Button
              disabled={!isValid}
              type="submit"
              theme={buttonTheme}
              className="submit font-semibold text-black disabled:text-gray-500"
            >
              Submit
            </Button>
            <Button
              type="button"
              theme={buttonTheme}
              className="reset font-semibold text-black"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCard;
