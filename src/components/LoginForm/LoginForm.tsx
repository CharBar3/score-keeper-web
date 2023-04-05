"use client";

import { ChangeEvent, FC, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import { UserAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import MuiLink from "@mui/material/Link";

// interface LoginFormProps {}

const LoginForm: FC = () => {
  const { loginWithEmailPassword } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    loginWithEmailPassword(email, password);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "Email") {
      setEmail(e.target.value);
    } else if (e.target.name === "Password") {
      setPassword(e.target.value);
    }
  };

  return (
    <Stack
      sx={{
        maxWidth: { sm: "300px", md: "500px", lg: "700px" },
        width: "100%",
        margin: "auto",
      }}
      spacing={3}
    >
      <Typography variant="h2">Login</Typography>
      <TextField
        // id="outlined-basic"
        label="Email"
        name="Email"
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        // id="outlined-basic"
        label="Password"
        name="Password"
        type="password"
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />
      <Button variant="contained" onClick={() => handleLogin()}>
        Login
      </Button>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Link href="/signup">Don't have an account? Click here to Sign Up!</Link>
    </Stack>
  );
};

export default LoginForm;
