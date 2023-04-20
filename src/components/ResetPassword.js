import React from "react";
import { useState, useCallback } from "react";
import { useStytch } from "@stytch/react";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");

  const stytchClient = useStytch();
  const navigate = useNavigate();

  const token = new URLSearchParams(window.location.search).get("token");

  const resetPassword = useCallback(() => {
    // alert(token);
    // alert(newPassword);
    debugger
    stytchClient.passwords.resetByEmail({
      token: token,
      password: newPassword,
      session_duration_minutes: 60,
    });
  }, [stytchClient, token, newPassword]);

  return (
    <div>
      <input
        placeholder="New Password..."
        onChange={(event) => {
          setNewPassword(event.target.value);          
        }}
      />

      <button onClick={resetPassword}> Reset Password</button>
    </div>
  );
};

export default ResetPassword;
