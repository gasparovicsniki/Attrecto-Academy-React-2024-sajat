import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import BadgesPage from "./pages/BadgesPage/BadgesPage";
import { UserPage } from "./pages/UserPage/UserPage";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="user/:id" element={<UserPage />} />
        <Route path="badges" element={<BadgesPage />} />
      </Routes>
    </div>
  );
}

export default App;
