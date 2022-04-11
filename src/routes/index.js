import React from "react";
import { Route, Routes } from "react-router-dom";
import BrowsePage from "../pages/BrowsePage";

function Router() {
  return (
    <Routes>
      <Route index element={<BrowsePage />} />
    </Routes>
  );
}

export default Router;
