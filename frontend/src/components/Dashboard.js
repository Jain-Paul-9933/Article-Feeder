import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApiUrl } from "../contexts/ApiContext";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const apiUrl = useApiUrl();

  const user = useSelector((state) => state.auth.user);

  const accessToken = localStorage.getItem("access_token");

  const user_data = accessToken ? jwtDecode(accessToken).user_data : null;

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token");
      navigate("/login");
    } else {
      (async () => {
        try {
          const { data } = await axios.get(`${apiUrl}/dashboard/home/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setMessage(data.message);
        } catch (e) {
          console.log("Error:", e);
        }
      })();
    }
  }, []);

  return (
    <div className="form-signin mt-5 text-center">
      <h3>
        Hi'{user_data ? user_data.first_name + " " + user_data.last_name : ""},
        {message}
      </h3>
    </div>
  );
};

export default Dashboard;
