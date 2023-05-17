import React from "react";
import HeaderPage from "../../components/Header/header";

export default function Dashboard() {
  return (
    <>
      <HeaderPage showCaretLeft={false} showSearchBar={true} />
      <h1>Dashboard</h1>
    </>
  );
}
