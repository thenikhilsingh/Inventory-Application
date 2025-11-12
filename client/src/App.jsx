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

  useEffect(() => {
    axios
      .get("http://localhost:3001/games")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3001/genres")
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3001/developers")
      .then((response) => {
        setDevelopers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
