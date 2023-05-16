"use client";

import { useAuth } from "@/providers/Auth";
import { useToast } from "@/providers/ToastProvider";

import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import InputBar from "../InputBar/InputBar";
// import useStyles from "./LoginForm.styles";

// interface LoginFormProps {}

const LoginForm: FC = () => {
  const { fireUser } = useAuth();
  const { showToast } = useToast();
  // const { classes, cx } = useStyles();

  // const className = cx(classes.buttonError, classes.root);
  // const className = cx({[classes.buttonError]: !email});

  const { loginWithEmailPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginWithEmailPassword(email, password);
      showToast("Login Successful!", "success");
    } catch (error) {
      showToast(`Login Failed! ${(error as Error).message}`, "error");
    }
  };

  useEffect(() => {
    if (fireUser) {
      redirect("/dashboard");
    }
  }, [fireUser]);

  return (
    <Stack
      sx={{
        maxWidth: { xs: "300px", sm: "320px" },
        width: "100%",
        margin: "auto",
      }}
      spacing={2}
    >
      <Typography variant="h2" textAlign="center">
        Login
      </Typography>
      <InputBar placeholder="Email" setInputValue={setEmail} value={email} />
      <InputBar
        placeholder="Password"
        setInputValue={setPassword}
        value={password}
        isPasswordInput={true}
      />
      <Button variant="blue" onClick={() => handleLogin()}>
        Login
      </Button>
      <Box sx={{ paddingTop: 5 }}>
        <Typography textAlign="center">{`Don't have an account?`}</Typography>
      </Box>
      <Link href="/signup">
        <Button variant="blue" sx={{ width: "100%" }}>
          Click here to Sign Up!
        </Button>
      </Link>
    </Stack>
  );
};

export default LoginForm;
