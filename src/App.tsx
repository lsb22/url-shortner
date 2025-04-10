import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { Routes, Route } from "react-router";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Statistics from "./components/Statistics";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home/:userId"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoutes>
              <Statistics />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
