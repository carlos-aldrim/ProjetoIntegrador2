import React from "react";
import { Login } from "../components";
import animationData from "../Assets/Lotties/login.json";
import Lottie from "react-lottie";

export const LoginPage: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full min-h-screen flex fle-col items-center justify-around py-6 px-4 md:w-[100vw]">
      <div className="overflow-hidden border grid md:grid-cols-2 items-center justify-items-center gap-0 max-w-5xl w-full rounded-lg">
        <Login />
        <div className="bg-[hsl(99,58%,52%)] h-full flex items-center justify-center p-6 w-full shadow-[0_2px_22px_-4px_rgba(0, 0, 0, 0.2)] max-md:mx-auto">
          <div className="lg:h-[400px] md:h-[350px] max-md:mt-8">
            <Lottie options={defaultOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
