import React, { useMemo } from "react";
import { AppNavBar } from "baseui/app-nav-bar";
import { ChevronLeft } from "baseui/icon";
import { extractNameFromEmail } from "../utils";

export default function Navbar({ user, onLogout }) {
  const navProps = useMemo(() => {
    if (!user) return {};
    const { email } = user;
    const username = extractNameFromEmail(email);
    return {
      username,
      userItems: [{ icon: ChevronLeft, label: "Logout" }],
      onUserItemSelect: onLogout
    };
  }, [user, onLogout]);
  return (
    <AppNavBar title="Temperature in India from 1901 to 2015" {...navProps} />
  );
}
