import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./loginThunk";

interface UserState {
  authloader: boolean;
}

const initialState: UserState = {
  authloader: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.authloader = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.authloader = false;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        // If the payload has a specific type, replace 'any' with that type
        // toast.error(action.payload?.data?.message);
        state.authloader = false;
      });
  },
});

export default userSlice.reducer;
