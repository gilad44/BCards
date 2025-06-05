import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MyFloatingLabel from "../comps/MyFloatingLabel";
import { buttonTheme } from "../data/themes";
import { TCard } from "../types/TCard";
import { editCardSchema } from "../Validations/editCard.joi";

type EditCardProps = {
  card: TCard;
  onClose: () => void;
};

const EditCard = ({ card }: EditCardProps) => {
  const initialFormData: TCard = {
    title: card.title,
    subtitle: card.subtitle,
    email: card.email,
    phone: card.phone,
    address: {
      state: card.address.state,
      country: card.address.country,
      city: card.address.city,
      street: card.address.street,
      houseNumber: card.address.houseNumber,
      zip: card.address.zip,
    },
    description: card.description,
    web: card.web,
    image: {
      url: card.image.url,
      alt: card.image.alt,
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
    resolver: joiResolver(editCardSchema),
  });

  const submitForm = async (form: TCard) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
      }

      await axios.put(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/65424d35cb6bcb58697bab4a",
        form,
      );
      toast.success("Card updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as { message?: string };
        console.error("API error response:", errorData); // Debugging log

        toast.error(
          `Failed to update card: ${errorData?.message || "Unknown error"}`,
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("Failed to update card");
      }
    }
  };

  return (
    <>
      <div className="formMain">
        <form className="form" onSubmit={handleSubmit(submitForm)}>
          <h1 className="formTitle">Edit Card</h1>
          <div className="formBody">
            {/* Left column */}
            <div className="leftColumn">
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
            <div className="rightColumn">
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
          <div className="formButtons">
            <Button
              disabled={!isValid}
              type="submit"
              className="submit font-semibold text-black disabled:text-gray-500"
              theme={buttonTheme}
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

export default EditCard;
