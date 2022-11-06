import React from "react";
import { useAuth } from "../providers/FirebaseAuthProvider";
import Navbar from "./Navbar";
import { styled } from "baseui";

export default function PageLayout({ children }) {
  const { user, logoutOut } = useAuth();
  return (
    <Layout>
      <Navbar user={user} onLogout={logoutOut} />
      <PageContainer className="ui-container">{children}</PageContainer>
    </Layout>
  );
}

const Layout = styled("main", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  overflow: "hidden"
}));

const PageContainer = styled("section", ({ $theme }) => ({
  flex: 1,
  overflowY: "auto"
}));
