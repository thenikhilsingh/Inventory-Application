import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";

const DataContext = createContext();

function App() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${VITE_API_URL}/games`)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${VITE_API_URL}/genres`)
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${VITE_API_URL}/developers`)
      .then((response) => {
        setDevelopers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [games, genres, developers]);
  return (
    <>
      <ScrollToTop />
      <Header />
      <DataContext.Provider
        value={{
          games,
          setGames,
          genres,
          setGenres,
          developers,
          setDevelopers,
        }}
      >
        <Outlet />
      </DataContext.Provider>
    </>
  );
}

export default App;
export { DataContext };
