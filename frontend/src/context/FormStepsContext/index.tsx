import { useState, useCallback, useMemo, createContext } from "react";
import { FormStepsContextType, DataCreateUser } from "../../types";

export const FormStepsContext = createContext<FormStepsContextType | undefined>(undefined);

export const FormStepsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [createUserData, setCreateUserData] = useState<DataCreateUser>({} as DataCreateUser);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = useCallback((data: Partial<DataCreateUser>) => {
    setCreateUserData((prevData: any) => ({ ...prevData, ...data }));
  }, []);

  const goToNextStep = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  }, []);

  const value = useMemo(() => ({
    data: createUserData,
    currentStep,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
  }), [createUserData, currentStep, updateFormData, goToNextStep, goToPreviousStep]);

  return (
    <FormStepsContext.Provider value={value}>
      {children}
    </FormStepsContext.Provider>
  );
};