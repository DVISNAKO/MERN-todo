import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Убедитесь, что Bootstrap стили подключены
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async (event) => {
        event.preventDefault()
        try {
            const response = await axios
            .post(
                "/api/auth/login",
                { ...form},
                {headers: {
                    "Content-Type": "application/json"
                }}
            )
            .then((response) => {
                login(response.data.token, response.data.userId)
            })
        }
        catch(e){
            console.log(e)
        }
    }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h3 className="text-center mb-4">Авторизация</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
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
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={changeHandler}
                value={form.password}
              />
            </div>
            <button onClick={loginHandler} type="submit" className="btn btn-primary w-100">Войти</button>
            <Link to={"/registration"} className="btn-outline btn-reg d-flex mt-2 justify-content-end">
              Нет аккаунта?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
