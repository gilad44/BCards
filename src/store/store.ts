import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchSlice from "../slices/searchSlice";
import userSlice from "../slices/userSlice"; // this is the user slice of the redux store

const store = configureStore({
  reducer: {
    userSlice,
    searchSlice,
  }, // this is where we will add our reducers (userSlice.reducer ). the name is always the name you imported above

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // this is to avoid the error of serializable check
    }), // this is where we will add our middleware
});

const RootReducer = combineReducers({
  userSlice,
  searchSlice,
});
export type RootState = ReturnType<typeof RootReducer>; // this is the type of the root state of the redux store

export default store; // this is the store of the redux
