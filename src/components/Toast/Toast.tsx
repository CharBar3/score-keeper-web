"use client";

import { useToast } from "@/providers/ToastProvider";
import { Alert, Snackbar } from "@mui/material";
import { FC } from "react";

const Toast: FC = () => {
  const { toastQueue, handleCloseToast } = useToast();

  let marginOffsetCounter = -1;

  const showToastQueue = toastQueue.map(
    ({ id, message, severity, isOpen }, index) => {
      if (isOpen) {
        marginOffsetCounter++;
      }

      return (
        <Snackbar
          key={id}
          open={isOpen}
          sx={{
            marginBottom: `${marginOffsetCounter * 55}px`,
            transition: "margin-bottom .2s ",
          }}
          // autoHideDuration={6000}
          // onClose={() => handleCloseToast(id)}
        >
          <Alert
            onClose={() => handleCloseToast(id)}
            severity={severity}
            sx={{ width: "100%" }}
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
