"use client";

import { useAuth } from "@/providers/Auth";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { FC } from "react";
import FriendsIcon from "../../../public/icons/friends_botton_icon-07.svg";
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
          <FriendsIcon color="white" />
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
