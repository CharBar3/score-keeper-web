import { FC } from "react";
import LoginForm from "@/components/LoginForm/LoginForm";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
