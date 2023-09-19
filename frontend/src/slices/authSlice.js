import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
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
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} = authSlice.actions;

export const registerUser = (formData, apiUrl) => async (dispatch) => {
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

export const loginUser = (userData, apiUrl) => async (dispatch) => {
  console.log("Enterd into login function");
  try {
    console.log(userData);
    const response = await axios.post(
      `${apiUrl}/authentification/token/`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Got response");
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.access}`;

    dispatch(loginSuccess(response.data));
    window.location.href = "/";
  } catch (error) {
    console.log("Got error");
    dispatch(loginFailure(error.response.data));
    window.location.href = "/login";
  }
};

export const logoutUser = (apiUrl) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return;
    }

    await axios.post(
      `${apiUrl}/authentification/logout/`,
      {
        refresh_token: localStorage.getItem("refresh_token"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    localStorage.clear();
    axios.defaults.headers.common["Authorization"] = null;

    dispatch(logoutSuccess());

    window.location.href = "/login";
  } catch (e) {
    console.log("logout not working", e);
  }
};


export default authSlice.reducer;
