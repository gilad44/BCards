import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MyFloatingLabel from "../comps/MyFloatingLabel";
import { buttonTheme } from "../data/themes";
import { userActions } from "../slices/userSlice";
import { RootState } from "../store/store";
import EditProfileData from "../types/EditProfileData";
import { editProfileSchema } from "../Validations/editprofile.joi";
const EditProfile = () => {
  const [editVisible, setEditVisible] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const initialFormData: EditProfileData = {
    name: {
      first: user?.name?.first || "",
      middle: user?.name?.middle || "",
      last: user?.name?.last || "",
    },
    phone: user?.phone,
    image: {
      url: user?.image.url || "",
      alt: user?.image.alt || "",
    },
    address: {
      state: user?.address?.state || "",
      country: user?.address?.country || "",
      city: user?.address?.city || "",
      street: user?.address?.street || "",
      houseNumber: user?.address?.houseNumber || 0,
      zip: user?.address?.zip || 0,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<EditProfileData>({
    defaultValues: initialFormData,
    mode: "all",
    resolver: joiResolver(editProfileSchema),
  });

  const submitForm = async (formData: typeof initialFormData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to update your profile");
        return;
      }
      axios.defaults.headers.common["x-auth-token"] = token;

      const userID = user?._id;

      if (!userID) {
        toast.error("User ID not found");
        return;
      }
      const res = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userID}`,
        formData,
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      const userData = res.data.user || res.data;
      dispatch(userActions.updateUser(userData));
      toast.success("Profile updated successfully!");
      setEditVisible(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as { message?: string };
        console.error("Profile update error:", errorData);

        toast.error(
          `Profile update failed: ${errorData?.message || "Unknown error"}`,
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("Profile update failed");
      }
    }
  };
  if (!editVisible) return null;
  return (
    <div className="formMain">
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <h1 className="formTitle">Edit Profile</h1>
        <div className="formBody">
          <div className="leftColumn">
            <MyFloatingLabel
              name="name.first"
              label="First Name"
              errors={errors}
              register={register}
            />
            <MyFloatingLabel
              name="name.middle"
              label="Middle Name"
              errors={errors}
              register={register}
            />
            <MyFloatingLabel
              name="name.last"
              label="Last Name"
              errors={errors}
              register={register}
            />

            <MyFloatingLabel
              name="phone"
              label="Phone"
              errors={errors}
              register={register}
            />
            <MyFloatingLabel
              name="image.url"
              label="Image URL"
              errors={errors}
              register={register}
            />
            <MyFloatingLabel
              name="image.alt"
              label="Image description"
              errors={errors}
              register={register}
            />
          </div>
          <div className="rightColumn">
            <MyFloatingLabel
              name="address.state"
              label="State"
              errors={errors}
              register={register}
            />
            <MyFloatingLabel
              name="address.country"
              label="Country"
              errors={errors}
              register={register}
            />
            <MyFloatingLabel
              name="address.city"
              label="City"
              errors={errors}
              register={register}
            />
            <MyFloatingLabel
              name="address.street"
              label="Street"
              errors={errors}
              register={register}
            />
            <MyFloatingLabel
              name="address.houseNumber"
              label="House Number"
              errors={errors}
              register={register}
            />
            <MyFloatingLabel
              name="address.zip"
              label="Zip Code"
              errors={errors}
              register={register}
            />
          </div>
        </div>
        <div className="formButtons">
          <Button
            disabled={!isValid}
            type="submit"
            className="submit"
            theme={buttonTheme}
          >
            Save changes
          </Button>
          <Button
            type="button"
            theme={buttonTheme}
            className="reset"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
