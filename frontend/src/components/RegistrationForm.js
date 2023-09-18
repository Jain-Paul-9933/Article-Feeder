import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/authSlice";
import { useApiUrl } from "../contexts/ApiContext";

const RegistrationForm = () => {
  const apiUrl = useApiUrl();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username:"",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirm_password: "",
    // article_preferences: [],
  });
  // console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleCheckboxChange = (e) => {
  //   const { name, value, checked } = e.target;
  //   const updatedPreferences = checked
  //     ? [...formData.article_preferences, value]
  //     : formData.article_preferences.filter((pref) => pref !== value);
  //   setFormData({ ...formData, [name]: updatedPreferences });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData, apiUrl));
    console.log("Submit Worked");
  };

  return (
    <div className="container">
      <h2 className="mt-5">Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        {/* <div className="mb-3">
          <label className="form-label">Article Preferences</label>
          <div>
            <input
              type="checkbox"
              id="preference1"
              name="article_preferences"
              value="1"
              onChange={handleCheckboxChange}
              checked={formData.article_preferences.includes("Sports")}
            />
            <label htmlFor="preference1" className="ms-2">
              Sports
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="preference2"
              name="article_preferences"
              value="2"
              onChange={handleCheckboxChange}
              checked={formData.article_preferences.includes("Technology")}
            />
            <label htmlFor="preference2" className="ms-2">
              Technology
            </label>
          </div>
        </div> */}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
