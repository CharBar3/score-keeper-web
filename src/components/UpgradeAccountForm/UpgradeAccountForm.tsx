"use client";

import { Button, Stack, Typography } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import InputBar from "../InputBar/InputBar";
import { useAuth } from "@/providers/Auth";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

interface UpgradeAccountFormProps {}

const UpgradeAccountForm: FC<UpgradeAccountFormProps> = () => {
  const { upgradeAnonymousAccount } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await upgradeAnonymousAccount(email, password);
      showToast("You've done it!", "success");
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (error) {
      showToast("There was a slight issue with your account upgrade", "error");
      console.log(error);
    }
  };

  return (
    <Stack
      spacing={1}
      sx={{
        maxWidth: { xs: "300px", sm: "320px" },
        width: "100%",
        margin: "auto",
      }}
    >
      <Typography variant="h1" textAlign="center">
        Upgrade Account
      </Typography>
      <form id="upgradeForm" onSubmit={(e) => handleSubmit(e)}>
        <InputBar
          placeholder="Email"
          value={email}
          setInputValue={setEmail}
          inputType="email"
          sx={{ marginBottom: 1 }}
        />
        <InputBar
          placeholder="Password"
          value={password}
          setInputValue={setPassword}
          inputType="password"
        />
      </form>
      <Button variant="blue" type="submit" form="upgradeForm">
        Confirm
      </Button>
    </Stack>
  );
};

export default UpgradeAccountForm;
