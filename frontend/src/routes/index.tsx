import { Routes, Route } from "react-router-dom";
import { PrivateRouter } from "../components";
import { useUser } from "../hooks/UseUser";
import { SignInPage, TokenPage, SignUpPage } from "../pages";

export const Router = () => {
  const { isLogin } = useUser();

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />

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
            <SignUpPage />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};
