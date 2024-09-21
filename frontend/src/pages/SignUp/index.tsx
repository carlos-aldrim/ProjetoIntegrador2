import React from "react";
import { SidebarSteps, RenderConditional, Name } from "../../components";
import { useFormSteps } from "../../hooks";

export const SignUpPage: React.FC = () => {
  const { currentStep } = useFormSteps();

  return (
    <div className="w-full min-h-screen overflow-auto flex flex-col items-center justify-center md:w-full">
      <div className="h-full grid md:grid-cols-2 items-center justify-items-center w-full">
        <SidebarSteps currentStep={currentStep} />

        <RenderConditional condition={currentStep === 0}>
          <Name />
        </RenderConditional>
      </div>
    </div>
  );
};
