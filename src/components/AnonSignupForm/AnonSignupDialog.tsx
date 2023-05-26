"use client";

import { useAuth } from "@/providers/Auth";
import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import InputBar from "../InputBar/InputBar";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

interface AnonSignupDialogProps {}

const AnonSignupDialog: FC<AnonSignupDialogProps> = () => {
  const { createAnonymousAccount } = useAuth();

  const [username, setUsername] = useState("");
  const { showToast } = useToast();
  const router = useRouter();

  const handleCreateAnonAccount = async () => {
    if (username === "") {
      showToast("Please add a username", "info");
      return;
    }

    try {
      await createAnonymousAccount(username);
      setUsername("");
      showToast("You're in!", "success");
      router.push("/dashboard");
    } catch (error) {
      showToast("There was an issue", "error");
      console.log(error);
    }
  };

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          maxWidth: { xs: "300px", sm: "320px" },
          width: "100%",
          margin: "auto",
        }}
      >
        <Typography variant="h2" textAlign="center">
          You can jump right in!
        </Typography>
        <InputBar
          value={username}
          placeholder="Username"
          setInputValue={setUsername}
        />
        <Button variant="blue" onClick={handleCreateAnonAccount}>
          Get started
        </Button>
      </Stack>
    </>
  );
};

export default AnonSignupDialog;
