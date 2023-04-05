import LoginForm from "@/components/LoginForm/LoginForm";
import { Stack, TextField } from "@mui/material";
import { FC } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
