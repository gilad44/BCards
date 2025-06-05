import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storedMode: localStorage.getItem("color-theme") || "light",
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.storedMode = action.payload;
      localStorage.setItem("color-theme", action.payload);
      if (action.payload === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    initTheme: (state) => {
      const currentTheme =
        localStorage.getItem("color-theme") || state.storedMode;
      if (state.storedMode !== currentTheme) {
        state.storedMode = currentTheme;
      }
      // Apply stored theme on app load
      if (state.storedMode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { setMode, initTheme } = modeSlice.actions;
export default modeSlice.reducer;
