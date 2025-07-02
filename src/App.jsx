import React from "react";
import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <div className="container">
      {/* Background radial fica atrás de todo o conteúdo */}
      <div className="background" />

      {/* Conteúdo da sua aplicação */}
      <div className="content">
        <Home />
      </div>
    </div>
  );
}

export default App;
