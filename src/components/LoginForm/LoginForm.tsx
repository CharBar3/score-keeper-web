"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import { UserAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { redirect } from "next/navigation";
import useStyles from "./LoginForm.styles";

// interface LoginFormProps {}

const LoginForm: FC = () => {
  const { classes, cx } = useStyles();

  // const className = cx(classes.buttonError, classes.root);
  // const className = cx({[classes.buttonError]: !email});

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

  const { isLoading, user } = UserAuth();

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    }

    // return () => {
    //   second
    // }
  }, [user, isLoading]);

  return (
    <Stack
      // sx={{
      //   maxWidth: { sm: "300px", md: "500px", lg: "700px" },
      //   width: "100%",
      //   margin: "auto",
      // }}
      spacing={3}
      className={classes.root}
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
