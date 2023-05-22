"use client";

import { useToast } from "@/providers/ToastProvider";
import { Alert, Slide, SlideProps, Snackbar, useTheme } from "@mui/material";
import { FC } from "react";

const Toast: FC = () => {
  const theme = useTheme();
  const { message, severity, isOpen, handleClose } = useToast();

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      onClose={() => handleClose()}
    >
      <Alert
        onClose={() => handleClose()}
        severity={severity}
        sx={{
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
