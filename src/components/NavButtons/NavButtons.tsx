"use client";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/providers/Auth";
import FriendsIcon from "../../../public/icons/friends_botton_icon-07.svg";

enum Path {
  Home = "",
  Login = "login",
  Signup = "signup",
  Dashboard = "dashboard",
  Friends = "friends",
  AddFriends = "add",

  Game = "game",
}

interface NavButtonsProps {}

const NavButtons: FC<NavButtonsProps> = () => {
  const { fireUser, logOut } = useAuth();
  const pathname = usePathname();
  const pathParams = pathname.split("/");

  return (
    <Box>
      {!fireUser && (
        <>
          {pathParams.at(-1) != Path.Home && (
            <Link href="/">
              <Button variant="dark">About</Button>
            </Link>
          )}

          {pathParams.at(-1) != Path.Login && (
            <Link href="/login">
              <Button variant="dark" sx={{ width: "90px" }}>
                Login
              </Button>
            </Link>
          )}

          {pathParams.at(-1) != Path.Signup && (
            <Link href="/signup">
              <Button variant="dark" sx={{ width: "90px" }}>
                Signup
              </Button>
            </Link>
          )}
        </>
      )}
      {fireUser && (
        <>
          {pathParams.at(-1) === Path.Home && (
            <Link href="/dashboard">
              <Button variant="dark" sx={{ marginRight: 1, width: "125px" }}>
                Dashboard
              </Button>
            </Link>
          )}
          {pathParams.at(-1) === Path.Dashboard && (
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button variant="dark" onClick={() => logOut()}>
                Sign Out
              </Button>
              <Link href="/dashboard/friends">
                <Button
                  variant="dark"
                  sx={{
                    minWidth: "0px",
                    width: "64px",
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  }}
                >
                  <FriendsIcon color="#ffffff" height="20px" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="dark">About</Button>
              </Link>
            </Box>
          )}
          {pathParams.at(-1) === Path.Friends && (
            <>
              <Link href="/dashboard">
                <Button variant="dark" sx={{ marginRight: 1 }}>
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/friends/add">
                <Button variant="blue" sx={{ marginLeft: 1 }}>
                  Add Friends
                </Button>
              </Link>
            </>
          )}
          {pathParams.at(-1) === Path.AddFriends && (
            <>
              <Link href="/dashboard">
                <Button variant="dark" sx={{ marginRight: 1 }}>
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/friends/">
                <Button variant="dark" sx={{ marginLeft: 1 }}>
                  My Friends
                </Button>
              </Link>
            </>
          )}
          {pathParams.at(-2) === Path.Game && (
            <>
              <Link href="/dashboard">
                <Button variant="dark" sx={{ marginRight: 1, width: "125px" }}>
                  Dashboard
                </Button>
              </Link>
              <Link href={`/dashboard/game/${pathParams.at(-1)}/settings`}>
                <Button variant="dark" sx={{ marginLeft: 1, width: "125px" }}>
                  Settings
                </Button>
              </Link>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default NavButtons;
