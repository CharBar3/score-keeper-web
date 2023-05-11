"use client";

import { useToast } from "@/providers/ToastProvider";
import { Alert, Snackbar } from "@mui/material";
import { FC } from "react";

const Toast: FC = () => {
  const { toastQueue, handleCloseToast } = useToast();

  let zIndexCount = 9000;

  const showToastQueue = toastQueue.map(
    ({ id, message, severity, isOpen }, index) => {
      zIndexCount--;

      return (
        <Snackbar
          key={id}
          open={isOpen}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            zIndex: zIndexCount,
            position: "fixed",
            top: "56px",
            animation: `slideUp 0.5s ease-in-out forwards`,
            "@keyframes slideUp": {
              from: {
                top: "64px",
              },
              to: {
                top: "8px",
              },
            },
          }}
          // autoHideDuration={6000}
          // onClose={() => handleCloseToast(id)}
        >
          <Alert
            onClose={() => handleCloseToast(id)}
            severity={severity}
            // sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      );
    }
  );

  return <>{showToastQueue}</>;
};

export default Toast;
