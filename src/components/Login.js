import React from "react";
import { useState, useCallback } from "react";
import { useStytch } from "@stytch/react";
import { setLogin } from "../LoginUtil";
import { useNavigate } from "react-router-dom";
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const stytchClient = useStytch();
  const navigate = useNavigate();

  const resetPasswordByEmail = useCallback(() => {
    stytchClient.passwords.resetByEmailStart({
      email: "james.higgins@constructconnect.com",
    });
  }, [stytchClient]);

  const login = () => {
    setLogin(false);
    debugger
    stytchClient.passwords.authenticate({
      email,
      password,
      session_duration_minutes: 60,
    }).then((v) => {
      const isLoggedIn = v.status_code == 200;
      setLogin(isLoggedIn)
      if (isLoggedIn) {

        navigate("/main");
      }
    })

      .catch((err) => {
        alert(err);
      })
  };



  // debugger;

  return (

    <>
      <nav className="navbar navbar-light bg-primary">
        <h1 className="navbar-brand text-white">Coin Ranker</h1>
        <a className="nav-link text-white font-weight-bold" href="/signup">Sign Up</a>
      </nav>


      <div className="d-flex flex-column justify-content-center">
      <div className="input-group">
        <span className="input-group-text">Email</span>
        <input 
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="input-group">
      <span className="input-group-text">Password</span>
        <input
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button onClick={login}> Login</button>
      </div>

      <div>
        <p> Forgot your password? </p>
        <button onClick={resetPasswordByEmail}> Reset Password</button>
      </div>
    </>
  );
};

export default Login;
