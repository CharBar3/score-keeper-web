import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  SxProps,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";

interface ConfirmationDialogProps {
  children: ReactNode;
  actionFunction: Function;
  sx?: SxProps;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  children,
  actionFunction,
  sx,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen} sx={sx}>
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Are you sure?</DialogTitle>
        <DialogActions>
          <Button variant="dark" onClick={handleClose} sx={{ flexGrow: 1 }}>
            Cancel
          </Button>
          <Button
            variant="red"
            onClick={() => {
              actionFunction();
              handleClose();
            }}
            autoFocus
            sx={{ flexGrow: 1 }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
