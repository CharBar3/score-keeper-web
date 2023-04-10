"use client";

import { useToast } from "@/providers/ToastProvider";
import { Alert, Snackbar } from "@mui/material";
import { FC } from "react";

const Toast: FC = () => {
  const { message, severity, isOpen, handleClose } = useToast();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => handleClose()}
    >
      <Alert
        onClose={() => handleClose()}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
