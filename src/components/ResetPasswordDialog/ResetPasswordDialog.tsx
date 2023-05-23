import { useAuth } from "@/providers/Auth";
import { useToast } from "@/providers/ToastProvider";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, FormEvent, ReactNode, useState } from "react";
import InputBar from "../InputBar/InputBar";

interface ResetPasswordDialogProps {
  children: ReactNode;
}

const ResetPasswordDialog: FC<ResetPasswordDialogProps> = ({ children }) => {
  const { resetPassword } = useAuth();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await resetPassword(email);
    } catch (error) {
      console.log(error);
    } finally {
      showToast(
        "If an account exists with this email, a password reset email will be sent shortly.",
        "info"
      );
      handleClose();
    }
  };

  return (
    <>
      <Box
        onClick={handleClickOpen}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter your email</DialogTitle>
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogContent>
            <InputBar
              placeholder="Email"
              value={email}
              setInputValue={setEmail}
              inputType="email"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="dark" sx={{ flexGrow: 1 }} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="blue" sx={{ flexGrow: 1 }} type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ResetPasswordDialog;
