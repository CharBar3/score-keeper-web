"use client";

import { useAuth } from "@/providers/Auth";
import { Box, Button } from "@mui/material";
import { FC } from "react";
import FriendsIcon from "../../../public/icons/friends_botton_icon-07.svg";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { dark } from "@mui/material/styles/createPalette";
import BottomBar from "../BottomBar/BottomBar";

interface DashboardNavProps {}

const DashboardNav: FC<DashboardNavProps> = () => {
  const { logOut } = useAuth();
  const theme = useTheme();
  return (
    <BottomBar>
      <Button
        variant="dark"
        onClick={() => logOut()}
        sx={{ height: "36px", width: "103px" }}
      >
        Sign Out
      </Button>
      <Link href="/dashboard/friends">
        <Button
          variant="dark"
          sx={{
            height: "36px",
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          <FriendsIcon />
        </Button>
      </Link>
      <Link href="/">
        <Button variant="dark" sx={{ height: "36px", width: "103px" }}>
          About
        </Button>
      </Link>
    </BottomBar>
  );
};

export default DashboardNav;
