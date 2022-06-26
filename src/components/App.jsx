import React from "react";
import { Admin } from "./Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import { Main } from "./Main";
import { Article } from "./Article";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route
          exact
          path="/article/:id"
          element={<Article />}
        />
      </Routes>
    </Router>
  );
};

export default App;
