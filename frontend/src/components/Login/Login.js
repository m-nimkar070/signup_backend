import React, { useState } from "react";
import { useUrl } from "../../components/Context/urlContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { url } = useUrl();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};

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

  const performLogin = async (url) => {
    try {
      const response = await axios.post(`${url}v1/auth/login`, { ...formData });
      console.log("response", response);
      navigate("/", { state: { username: formData.username } });
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors(() => ({ login: "Invalid username or password" }));
      alert(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await performLogin(url);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-feilds">
          <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          </div>
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="input-feilds">
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              title="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
