import { Navbar, Nav } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useApiUrl } from "../contexts/ApiContext";
import { logoutUser } from "../slices/authSlice";

const Navigationbar = () => {
  const apiUrl = useApiUrl();

  const dispatch = useDispatch();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  const handleLogout = () => {
    dispatch(logoutUser(apiUrl));
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Article Feeder</Navbar.Brand>
        <Nav className="me-auto">
          {isAuth ? <Nav.Link href="/">Dashboard</Nav.Link> : null}
        </Nav>
        <Nav>
          {isAuth ? (
            <>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              {/* <Nav.Link href="/login">Login</Nav.Link> */}
            </>
          ) : (
            <>
              <Nav.Link href="/registration">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
