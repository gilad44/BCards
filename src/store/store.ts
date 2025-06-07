import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchSlice from "../slices/searchSlice";
import userSlice from "../slices/userSlice";
const store = configureStore({
  reducer: {
    userSlice,
    searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const RootReducer = combineReducers({
  userSlice,
  searchSlice,
});
export type RootState = ReturnType<typeof RootReducer>;

export default store;
