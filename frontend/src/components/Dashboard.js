import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApiUrl } from "../contexts/ApiContext";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  const apiUrl = useApiUrl();

  console.log(apiUrl)

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
  
    if (!accessToken) {
      window.location.href = "/login";
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
      <h3>Hi {message}</h3>
    </div>
  );
};

export default Dashboard;
