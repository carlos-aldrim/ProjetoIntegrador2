import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { TokenPage } from "../pages/TokenPage";
import { PrivateRouter } from "../components/privateRouter";
import { useUser } from "../context/UserContext";
import { RegisterPage } from "../pages/RegisterPage";

export const Router = () => {
  const { isLogin, isAuth } = useUser();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/confirm-token"
        element={
          <PrivateRouter auth={isLogin}>
            <TokenPage />
          </PrivateRouter>
        }
      />

      <Route
        path="/signup"
        element={
          <PrivateRouter auth={true}>
            <RegisterPage />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};
