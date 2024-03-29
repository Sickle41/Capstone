import React from "react";
import "./style.css"
import {HomePage} from './components/HomePage.jsx';
import { Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login.jsx";
import { Register } from "./components/auth/Register.jsx";
import { NavBar } from "./components/navbar/NavBar.jsx";
import { CreateCardForm } from "./components/cards/AddCard.jsx";
import { Profile } from "./components/profile/Profile.jsx";
import { CardGallery } from "./components/cards/UserCardGallery.jsx";
import { EditCard } from "./components/cards/EditCards.jsx";


export const App = () => {
  return (
   <Routes>
    <Route
    path="/"
    element={
      <>
        <NavBar />
        <Outlet />
      </>
    }
    >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<HomePage />} />
      <Route path="/cardgallery" element={<CardGallery />} />
      <Route
        path="/newcard"
        element={<CreateCardForm  />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-card/:cardId" element={<EditCard />} />
    </Route>
   </Routes>
  );
}


