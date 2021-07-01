// import GlobalProvider from "./context/Provider";
import GlobalProvider from "./GlobalContext";
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom";
import Pages from "./Pages/Pages";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const { path, url } = useRouteMatch();
  let location = useLocation().pathname;
  return (
    <GlobalProvider>
      <div className="App">
        {location === "/login" || location === "/register" ? (
          <Navbar
            style={{
              backgroundColor: "transparent",
              borderBottom: 0,
              color: "white",
            }}
          />
        ) : (
          location !== "/" && <Navbar />
        )}

        <Pages />
      </div>
    </GlobalProvider>
  );
}

export default App;
