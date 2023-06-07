"use client";

import { useAuth } from "@/providers/Auth";
import { useToast } from "@/providers/ToastProvider";
import { UserService } from "@/services/user-service";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import SpicyTextField from "../SpicyTextField/SpicyTextField";

interface AnonSignupDialogProps {}

const AnonSignupDialog: FC<AnonSignupDialogProps> = () => {
  const { createAnonymousAccount, fireUser } = useAuth();

  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleCreateAnonAccount = async () => {
    if (username === "") {
      showToast("Please add a username", "info");
      return;
    }

    try {
      if (isAvailable) {
        await createAnonymousAccount(username);
        setUsername("");
        showToast("You're in!", "success");
        router.push("/dashboard");
      } else {
        showToast("Can you read?", "error");
      }
    } catch (error) {
      showToast("There was an issue", "error");
      console.log(error);
    }
  };

  const checkUsername = async (username: string | null) => {
    if (!username) {
      setIsSearching(false);
      return;
    }

    const usernameCheck = await UserService.checkUsername(username);
    setIsAvailable(usernameCheck);
    setIsSearching(false);
  };

  if (fireUser) {
    return <></>;
  }

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
          Pick a username to get started!
        </Typography>
        <SpicyTextField
          placeholder="Username"
          setIsSearching={setIsSearching}
          onChangeSearch={checkUsername}
          isSearching={isSearching}
          debounce={2000}
          setValue={setUsername}
        />
        <Box>
          <Collapse in={isSearching}>
            <Typography textAlign="center">Checking Availability</Typography>
          </Collapse>
          <Collapse in={!isSearching && !isAvailable && !!username}>
            <Button
              variant="red"
              sx={{ width: "100%" }}
              onClick={handleCreateAnonAccount}
            >
              Username Taken {`:(`}
            </Button>
          </Collapse>
          <Collapse in={!isSearching && isAvailable}>
            <Button
              variant="blue"
              sx={{ width: "100%" }}
              onClick={handleCreateAnonAccount}
            >
              Lets Go!
            </Button>
          </Collapse>
        </Box>
      </Stack>
    </>
  );
};

export default AnonSignupDialog;
