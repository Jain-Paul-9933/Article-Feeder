import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { registerSuccess, registerFailure } = authSlice.actions;



export const registerUser = (formData,apiUrl) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${apiUrl}/authentification/register/`,
      formData
    );
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure(error.response));
  }
};

export default authSlice.reducer;
