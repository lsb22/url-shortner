import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { Routes, Route } from "react-router";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
      </Routes>
    </div>
  );
};

export default App;
