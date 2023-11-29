import React, {Redirect, useState } from "react";
import loginImg from "./login.svg";
import { Modal, Button } from "react-bootstrap";

export const Login = () => {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [redirect, setRedirect] = useState(false);
 const [error, setError] = useState(false);

 const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError(true);
      return;
    }

    // Make a request to your backend for authentication
    fetch("/api/userController", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Authentication successful, redirect to another page
          setRedirect(true);
        } else {
          // Authentication failed, handle accordingly (show error message, etc.)
          setError(true);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError(true);
      });
 };

 if (redirect) {
    return <Redirect to="./chatbot" />; // Change "/dashboard" to the path you want to redirect to
 }

 return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Login" />
        </div>
        <div className="form">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="footer">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal show={error} onHide={() => setError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login failed. Please check your credentials and try again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setError(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
 );
};