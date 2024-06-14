import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Registration = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/api/auth/registration", // Используйте полный путь к серверу
        { ...form },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setForm({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h3 className="text-center mb-4">Регистрация</h3>
          <form onSubmit={registerHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                onChange={changeHandler}
                value={form.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={changeHandler}
                value={form.password}
              />
            </div>
            <div className="d-flex ">
                <button type="submit" className="btn btn-primary w-100">
              Зарегистрироваться
            </button>
            </div>
            
            <Link to={"/login"} className="btn-outline btn-reg mt-2 d-flex justify-content-end" >
              Есть аккаунт?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
