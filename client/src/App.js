import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {DataProvider} from "./GlobalState";
import Header from "./components/layout/header/Header";
import Pages from "./components/Pages/Pages";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="main">
          <Header/>
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
