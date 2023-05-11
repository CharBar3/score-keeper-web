import HomeNav from "@/components/HomeNav/HomeNav";
import SignUpFrom from "@/components/SignUpForm/SignUpForm";
import { FC } from "react";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  return (
    <>
      <SignUpFrom />
      <HomeNav />
    </>
  );
};

export default SignUp;
