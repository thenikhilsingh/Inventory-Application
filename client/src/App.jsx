import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"
import Header from "./components/Header";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header/>
      <Outlet />
    </>
  );
}

export default App;
