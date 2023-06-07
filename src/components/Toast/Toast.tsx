"use client";

import { useToast } from "@/providers/ToastProvider";
import { Alert, Slide, SlideProps, Snackbar, useTheme } from "@mui/material";
import { FC } from "react";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const Toast: FC = () => {
  const theme = useTheme();
  const { message, severity, isOpen, handleClose } = useToast();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      onClose={(event, reason) => {
        if (reason != "clickaway") {
          handleClose();
        }
      }}
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
