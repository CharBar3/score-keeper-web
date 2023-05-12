"use client";

import { useAuth } from "@/providers/Auth";
import { useToast } from "@/providers/ToastProvider";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import InputBar from "../InputBar/InputBar";

const SignUpFrom: FC = () => {
  const { fireUser, createAccount } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    try {
      await createAccount(email, password, username);
      showToast("Sign Up Successful!", "success");
    } catch (error) {
      showToast("Sign Up Failed!", "error");
    }
  };

  useEffect(() => {
    if (fireUser) {
      redirect("/dashboard");
    }
  }, [fireUser]);

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
        maxWidth: { xs: "300px", sm: "300px", md: "500px", lg: "700px" },
        width: "100%",
        margin: "auto",
      }}
      spacing={2}
    >
      <Typography variant="h2" textAlign="center">
        Sign Up
      </Typography>

      <InputBar
        defaultValue=""
        placeholder="Username"
        setInputValue={setUsername}
      />
      <InputBar defaultValue="" placeholder="Email" setInputValue={setEmail} />
      <InputBar
        defaultValue=""
        placeholder="Password"
        setInputValue={setPassword}
        isPasswordInput={true}
      />

      <Button variant="blue" onClick={() => handleSignUp()}>
        Sign Up
      </Button>
    </Stack>
  );
};

export default SignUpFrom;
