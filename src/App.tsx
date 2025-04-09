import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { Routes, Route } from "react-router";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
