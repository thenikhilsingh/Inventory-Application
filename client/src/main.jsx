import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/pages/Dashboard.jsx";
import Game from "./components/pages/Game.jsx";
import Genre from "./components/pages/Genre.jsx";
import Developer from "./components/pages/Developer.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Dashboard />}></Route>
      <Route path="/games" element={<Game />}></Route>
      <Route path="/genres" element={<Genre />}></Route>
      <Route path="/developers" element={<Developer />}></Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
