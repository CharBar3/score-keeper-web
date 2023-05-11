import { FC } from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import HomeNav from "@/components/HomeNav/HomeNav";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <>
      <LoginForm />
      <HomeNav />
    </>
  );
};

export default Login;
