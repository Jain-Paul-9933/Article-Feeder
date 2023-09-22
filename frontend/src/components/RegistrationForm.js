import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/authSlice";
import { useApiUrl } from "../contexts/ApiContext";
import { Container, Form, Button } from "react-bootstrap";

const RegistrationForm = () => {
  const apiUrl = useApiUrl();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
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
    try {
      dispatch(registerUser(formData, apiUrl));
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Container>
      <h2 className="mt-5">Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="userName">Username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="phone">Phone</Form.Label>
          <Form.Control
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="dob">Date of Birth</Form.Label>
          <Form.Control
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Checkbox Example (Uncomment and modify as needed)
        <Form.Group className="mb-3">
          <Form.Label>Article Preferences</Form.Label>
          <Form.Check
            type="checkbox"
            label="Sports"
            id="preference1"
            name="article_preferences"
            value="Sports"
            onChange={handleCheckboxChange}
            checked={formData.article_preferences.includes('Sports')}
          />
          <Form.Check
            type="checkbox"
            label="Technology"
            id="preference2"
            name="article_preferences"
            value="Technology"
            onChange={handleCheckboxChange}
            checked={formData.article_preferences.includes('Technology')}
          />
        </Form.Group> */}

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegistrationForm;
