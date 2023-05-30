"use client";

import { useAuth } from "@/providers/Auth";
import { useToast } from "@/providers/ToastProvider";
import { Button, Stack, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import InputBar from "../InputBar/InputBar";
import AnonSignupDialog from "../AnonSignupForm/AnonSignupDialog";

const SignUpFrom: FC = () => {
  const { fireUser, createAccount } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    try {
      await createAccount(email, password, username);
      showToast("Sing up successful", "success");
    } catch (error) {
      showToast("Failed to signup", "error");
    }
  };

  // useEffect(() => {
  //   if (fireUser) {
  //     redirect("/dashboard");
  //   }
  // }, [fireUser]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "Email") {
      setEmail(e.target.value);
    } else if (e.target.name === "Password") {
      setPassword(e.target.value);
    } else if (e.target.name === "Username") {
      setUsername(e.target.value);
    }
  };

  return (
    <Stack
      sx={{
        maxWidth: { xs: "300px", sm: "320px" },
        width: "100%",
        margin: "auto",
      }}
      spacing={2}
    >
      <AnonSignupDialog />
      <Typography variant="h2" textAlign="center">
        Sign Up
      </Typography>

      <InputBar
        value={username}
        placeholder="Username"
        setInputValue={setUsername}
      />
      <InputBar
        value={email}
        placeholder="Email"
        setInputValue={setEmail}
        inputType="email"
      />
      <InputBar
        value={password}
        placeholder="Password"
        setInputValue={setPassword}
        inputType="password"
      />

      <Button variant="blue" onClick={() => handleSignUp()}>
        Sign Up
      </Button>
    </Stack>
  );
};

export default SignUpFrom;
