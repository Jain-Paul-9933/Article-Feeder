import axios from "axios";

let refresh = false;

const setupAxiosInterceptors = () => {

  axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
      if (error.response.status === 401 && !refresh) {
        refresh = true;
        console.log(localStorage.getItem("refresh_token"));
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/authentification/token/refresh/",
            {
              refresh: localStorage.getItem("refresh_token"),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data["access"]}`;
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            refresh = false;
            window.location.href = "/";
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }
      }
      refresh = false;
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
