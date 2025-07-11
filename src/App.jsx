import React from "react";
import { Routes, Route } from "react-router-dom";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import UrlStatisticsPage from "./pages/UrlStatisticsPage";
import RedirectHandler from "./pages/RedirectHandler";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <Routes>
        <Route path="/" element={<UrlShortenerPage />} />
        <Route path="/stats" element={<UrlStatisticsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Container>
  );
}

export default App;
