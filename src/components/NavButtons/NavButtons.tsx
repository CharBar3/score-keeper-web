"use client";
import { useAuth } from "@/providers/Auth";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC } from "react";
import FriendsIcon from "../../../public/icons/friends_botton_icon-07.svg";

enum Path {
  Home = "",
  Login = "login",
  Signup = "signup",
  Dashboard = "dashboard",
  Friends = "friends",
  AddFriends = "add",
  Game = "game",
  New = "new",
}

interface NavButtonsProps {}

const NavButtons: FC<NavButtonsProps> = () => {
  const { fireUser, logOut, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const pathParams = pathname.split("/");

  return (
    <Box>
      {!fireUser && (
        <Stack direction="row" spacing={2}>
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
        </Stack>
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
              {!fireUser.isAnonymous ? (
                <Button
                  variant="dark"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="dark"
                  onClick={() => {
                    router.push("/upgrade");
                  }}
                >
                  Upgrade Account
                </Button>
              )}

              <Link href="/dashboard/friends">
                <Button
                  variant="dark"
                  sx={{
                    minWidth: "0px",
                    width: "64px",
                    paddingLeft: "14px",
                    paddingRight: "14px",
                    margin: "0px 16px",
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
          {pathParams.at(-2) === Path.Game &&
            pathParams.at(-1) !== Path.New && (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="dark"
                    sx={{ marginRight: 1, width: "125px" }}
                  >
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
