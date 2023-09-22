import React, { useState } from "react";
import { useApiUrl } from "../contexts/ApiContext";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/authSlice";
import { Container, Button, Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = useApiUrl();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      dispatch(loginUser(userData, apiUrl));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh" }}
    >
      <Container style={{ maxWidth: "500px" }}>
        <div className="Auth-form-container">
          <Form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2 mt-3">
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
