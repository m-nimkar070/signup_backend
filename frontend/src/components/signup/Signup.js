import React, { useState  } from "react";
import { useUrl } from "../../components/Context/urlContext";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobNumber: "",
    username: "",
    password: "",
  });

  const { url } = useUrl();
  const [errors, setErrors] = useState({});
  const nevigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};

    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.firstName = "First name should contain only alphabets";
    }

    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = "Last name should contain only alphabets";
    }

    if (!/^\d{10}$/.test(formData.mobNumber)) {
      errors.mobNumber = "Mobile number should contain exactly 10 digits";
    }

    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(formData.username)) {
      errors.username =
        "Username should start with an alphabet and contain only alphanumeric characters";
    } else if (!/\d/.test(formData.username)) {
      errors.username = "Username should contain at least one number";
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,10}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password should be 7-10 characters long and contain letters and numbers and special characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createUserApiCall = async (url) => {
    console.log("api", { ...formData });
    try {
      const response = await axios.post(`${url}v1/auth/register`, {...formData}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res Data", response.data);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await createUserApiCall(url);
      nevigate('/',{ state: { username: formData.username } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobNumber"
          value={formData.mobNumber}
          maxLength="10"
          onChange={handleChange}
        />
        {errors.mobNumber && <p>{errors.mobNumber}</p>}
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          title="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
