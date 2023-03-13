import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Policy from "../components/Policy";
import Back from "../components/Back";
import Input from "../components/Input";
import Button from "../components/Button";

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    const { email, name, password, confirmPassword } = newUser;
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    const response = fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response;
    const json = await data.json();

    if (data.status === 201) {
      setSuccess(true);
      setMessage(json.message);
    } else {
      setSuccess(false);
      setMessage(json.message);
    }
  };

  if (success) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="signup">
        <Back />
        <h1 className="left">Sign Up</h1>
        <Input placeholder="User name" name="name" onChange={handleChange} />
        <Input
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          name="password"
          onChange={handleChange}
          icon={true}
        />
        <Input
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={handleChange}
          icon={true}
        />
        <Button title="Sign up" onClick={handleSubmit} />
        <Policy />
      </div>
    );
  }
};

export default SignUp;
