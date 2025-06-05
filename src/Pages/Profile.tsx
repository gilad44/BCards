import { Button } from "flowbite-react";
import { useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { useSelector } from "react-redux";
import EditProfile from "../comps/EditProfile";
import UserDetail from "../comps/UserDetail";
import { buttonTheme } from "../data/themes";
import { RootState } from "../store/store";
const Profile = () => {
  const user = useSelector((state: RootState) => state.userSlice.user);

  const capitalize = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const [editVisible, setEditVisible] = useState(false);
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Please log in to view your profile</p>
      </div>
    );
  }
  return (
    <>
      <div className="flex size-full items-center justify-center">
        <div className={`formDiv ${editVisible ? "opacity-100" : "opacity-0"}`}>
          <EditProfile />
        </div>
      </div>
      
      <div className="profileMainDiv">
        <div className="profileHeader">
          <h1 className="profileTitle">
            Welcome {capitalize(user.name.first)}
          </h1>
          <p className="profileDescription">View & edit your profile</p>
        </div>
        <img
          className="userImage"
          src={user?.image.url}
          alt={user?.image.alt}
        />
        <h1 className="mt-fluid-xl text-fluid-2xl">Your Profile</h1>
        <div className="profile">
          <div className="flex w-full justify-between px-3">
            <h2 className="userInfoTitle">User Info</h2>
            <Button
              theme={buttonTheme}
              size="md"
              className="profileEditButton"
              onClick={() => setEditVisible(!editVisible)}
            >
              Edit Profile
            </Button>
          </div>
          <div className="userDetailsDiv">
            <UserDetail
              field="Name"
              value={`${capitalize(user.name.first)}${capitalize(user.name.middle)}${" "}
            ${capitalize(user.name.last)}`}
            />
            <UserDetail field="Email" value={user?.email} />
            {user?.isBusiness && (
              <UserDetail field="User type" value="Business" />
            )}
            {!user?.isBusiness && (
              <UserDetail field="User type" value="Regular" />
            )}
            {user?.isAdmin && <UserDetail field="Admin" value="Yes" />}
            {!user?.isAdmin && <UserDetail field="Admin" value="No" />}
          </div>
          <div className="userContactDiv">
            <h2 className="userContactTitle">Contact</h2>
            <UserDetail field="Phone" value={user?.phone} />
            <UserDetail
              field="Street"
              value={`${user?.address.houseNumber}
              ${capitalize(user.address.street)}`}
            />
            <UserDetail field="City" value={capitalize(user.address.city)} />
            <UserDetail
              field="Country"
              value={capitalize(user.address.country)}
            />
            {user?.address.state && (
              <UserDetail field="State" value={user.address.state} />
            )}
            <UserDetail field="Zip" value={user?.address.zip} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
