import React from "react";
import {
  CheckCircleIcon,
  HomeIcon,
  IdentificationIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const steps = [
  {
    id: "1",
    title: "Quem é você?",
    description: "Informe seu nome",
    icon: <UserIcon className="h-7 w-7 text-zinc-800" />,
  },
  {
    id: "2",
    title: "Nos Fale mais",
    description: "Dados cadastrais",
    icon: <IdentificationIcon className="h-7 w-7 text-zinc-800" />,
  },
  {
    id: "3",
    title: "Onde te encontramos?",
    description: "Dados de endereço",
    icon: <HomeIcon className="h-7 w-7 text-zinc-800" />,
  },
  {
    id: "4",
    title: "Crie sua segurança",
    description: "Senha para entrar",
    icon: <LockClosedIcon className="h-7 w-7 text-zinc-800" />,
  },
];

interface SidebarStepsPrips {
  currentStep: number;
}

export const SidebarSteps: React.FC<SidebarStepsPrips> = ({ currentStep }) => {
  const activated = currentStep;

  return (
    <div className="bg-[hsl(99,58%,52%)] h-full p-8 pr-20 hidden flex-col items-center justify-center gap-6 w-full md:flex">
      <div className="hidden flex-col justify-center gap-14 max-h-screen w-4/5 border-1 border-gray-300 border-r relative md:flex">
        {steps.map((item, index) => {
          return (
            <div className="flex items-center" key={item.id}>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-zinc-800">{item.title}</span>
                <span className="text-sm font-semibold text-zinc-800 opacity-75">
                  {item.description}
                </span>
              </div>
              <div
                className={`absolute -right-6 w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 border-2 border-zinc-800 ${
                  activated >= index + 1 && "!bg-emerald-800 !border-0"
                } ${
                  activated === index &&
                  "!bg-white scale-125 transition-transform duration-500"
                }`}
              >
                {activated >= index + 1 ? (
                  <CheckCircleIcon className="text-white h-12 w-12" />
                ) : (
                  item.icon
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
