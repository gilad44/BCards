type EditProfileData = {
  name: {
    first?: string;
    middle?: string;
    last?: string;
  };
  phone?: string;
  image?: {
    url?: string;
    alt?: string;
  };
  address?: {
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNumber?: number;
    zip?: number;
  };
};
export default EditProfileData;
