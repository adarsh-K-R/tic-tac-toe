import "./App.css";
import { HashRouter } from "react-router-dom";
import TicTacToe from "./Components/TicTacToe";

function App() {
  return (
    <div>
      <HashRouter base="/">
        <TicTacToe />
      </HashRouter>
    </div>
  );
}

export default App;
