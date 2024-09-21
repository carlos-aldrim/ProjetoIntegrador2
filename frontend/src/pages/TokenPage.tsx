import React from "react";
import { TokenInput } from "../components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const TokenPage: React.FC = () => {
  const { login, confirmUser, user } = useUser();
  const navigate = useNavigate();

  const handleTokenComplete = async (token: string) => {
    if (user?.mail) {
      await confirmUser(user.mail, token);
    }
  };

  const handleResendToken = async () => {
    if (user?.mail && user?.password) {
      await login(user.mail, user.password);
    }
  };

  const handleBackPage = async () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen flex fle-col items-center justify-around py-6 px-4 md:w-[100vw]">
      <div className="overflow-hidden border items-center justify-center gap-0 max-w-sm w-full rounded-lg">
        <div className="bg-zinc-800 p-6 w-full shadow-[0_2px_22px_-4px_rgba(0, 0, 0, 0.2)] max-md:mx-auto">
          <div className="space-y-4">
            <div className="mb-8 text-center">
              <h3 className="text-white text-3xl font-extrabold">
                Confirme seu E-mail
              </h3>
              <p className="text-white text-md mt-4 leading-relaxed">
                Para continuar, insira o código de verificação enviado para seu
                e-mail. Esse código é necessário para confirmar sua identidade e
                concluir o processo de cadastro.
              </p>

              <TokenInput length={6} onComplete={handleTokenComplete} />
              <p className="text-white text-sm text-center mt-4">
                Se você não recebeu o código,{" "}
                <a
                  onClick={handleResendToken}
                  className="text-[hsl(99,58%,52%)] cursor-pointer"
                >
                  reenvie o código
                </a>
                .
              </p>

              <p className="text-gray-100 text-md text-center mt-4">
                <a
                  onClick={handleBackPage}
                  className="cursor-pointer hover:underline"
                >
                  Voltar ao login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
