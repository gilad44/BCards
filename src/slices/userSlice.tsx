import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  _id: "";
  email: "";
  password: "";
  name: {
    first: "";
    middle: "";
    last: "";
  };
  phone: "";
  image: {
    url: "";
    alt: "";
  };
  address: {
    state: "";
    country: "";
    city: "";
    street: "";
    houseNumber: 0;
    zip: 0;
  };
  isBusiness: false;
  isAdmin: false;
};
const getUserFromStorage = (): TUser | null => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};
const initialState = {
  user: getUserFromStorage() as TUser | null,
};

const userSlice = createSlice({
  name: "user", // name OF THE SLICE
  initialState,
  reducers: {
    login: (state, data) => {
      state.user = data.payload;
      localStorage.setItem("user", JSON.stringify(data.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    updateUser: (state, data) => {
      if (state.user) {
        state.user = { ...state.user, ...data.payload };
        localStorage.setItem("user", JSON.stringify(data.payload));
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
