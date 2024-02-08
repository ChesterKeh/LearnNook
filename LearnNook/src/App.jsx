import { useState } from "react";
import "./App.css";
import Homepage from "./pages/MainPage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Homepage />
    </>
  );
}

export default App;
