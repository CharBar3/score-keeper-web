"use client";

import { useAuth } from "@/providers/Auth";
import { useToast } from "@/providers/ToastProvider";

import { Box, Collapse, Stack, Typography } from "@mui/material";

import Button from "@mui/material/Button";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import InputBar from "../InputBar/InputBar";
import ResetPasswordDialog from "../ResetPasswordDialog/ResetPasswordDialog";
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
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await loginWithEmailPassword(email, password);
      showToast("Login successful", "success");
      setShowPasswordReset(false);
    } catch (error) {
      setShowPasswordReset(true);
      showToast(`Failed to login ${(error as Error).message}`, "error");
    }
  };

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (fireUser) {
      redirect("/dashboard");
    }
  }, [fireUser]);

  return (
    <Stack
      sx={{
        // maxWidth: { xs: "300px", sm: "320px" },
        width: "100%",
        maxWidth: "300px",
        margin: "auto",
      }}
      spacing={2}
    >
      <Typography variant="h2" textAlign="center">
        Login
      </Typography>
      <InputBar
        placeholder="Email"
        setInputValue={setEmail}
        value={email}
        inputType="email"
      />
      <InputBar
        placeholder="Password"
        setInputValue={setPassword}
        value={password}
        inputType={showPassword ? "text" : "password"}
        toggleFunction={handleToggle}
        showIcon={true}
      />
      <Box>
        <Button
          variant="blue"
          sx={{ margin: "0px 0px 8px 0px", width: "100%" }}
          onClick={() => handleLogin()}
        >
          Login
        </Button>
      </Box>
      <Collapse in={showPasswordReset}>
        <ResetPasswordDialog>
          <MUILink>Reset Password</MUILink>
        </ResetPasswordDialog>
      </Collapse>
      <Box sx={{ paddingTop: 5 }}>
        <Typography textAlign="center">{`Don't have an account?`}</Typography>
      </Box>
      <Link href="/signup">
        <Button
          variant="blue"
          sx={{ margin: "0px 0px 8px 0px", width: "100%" }}
        >
          Click here to Sign Up!
        </Button>
      </Link>
    </Stack>
  );
};

export default LoginForm;
