import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addressValidation } from "../../utils";
import { ButtonStepForm } from "../ButtonStepForm";
import { SpinnerLoading } from "../SpinnerLoading";
import { ControllerInputMask } from "../ControllerInputMask";
import { ControllerTextInput } from "../ControllerTextInput";

export const Address: React.FC = () => {
  const { control, handleSubmit, getValues, setValue } = useForm({
    resolver: yupResolver(addressValidation),
  });

  const { handleNextStep, handleOnChangeTextInput } = useFormStep();
  const [cep, setCep] = useState('');

  const { data, isLoading, refetch } = useGetAdressByViaCep(cep);

  const onSubmit = (values: any) => {
    handleOnChangeTextInput({
      address: {
        ...values,
      },
    });
    handleNextStep();
  };

  const handleBlurInputCep = () => {
    const cepValue = getValues("zipCode");
    setCep(cepValue);
  };

  useEffect(() => {
    if (cep) {
      refetch()
    }
  }, [cep])

  useEffect(() => {
    if (!!data) {
      setValue("neighborhood", data.bairro);
      setValue("addressLine", data.logradouro);
    }
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-4"
    >
      <div className="flex gap-4 w-full items-center justify-between mb-4">
        <ControllerInputMask
          mask="99999-999"
          control={control}
          name="zipCode"
          label="CEP"
          autoFocus
          placeholder="Seu CEP"
          onBlur={handleBlurInputCep}
        />
        <ControllerTextInput
          control={control}
          name="addressLine"
          label="Rua"
          placeholder="Digite o nome da sua rua"
          rightIcon={
            isLoading && <SpinnerLoading size="SMALL" color="gray-300" />
          }
        />
      </div>

      <div className="flex gap-4 w-full items-center justify-between">
        <ControllerTextInput
          control={control}
          name="addressLineNumber"
          label="Nº da casa"
          placeholder="Digite o número da sua casa"
        />
        <ControllerTextInput
          control={control}
          name="neighborhood"
          label="Bairro"
          placeholder="Digite o nome do seu bairro"
          rightIcon={
            isLoading && <SpinnerLoading size="SMALL" color="gray-300" />
          }
        />
      </div>

      <div className="flex justify-end items-end mt-10">
        <ButtonStepForm />
      </div>
    </form>
  );
};

function useFormStep(): { handleNextStep: any; handleOnChangeTextInput: any; } {
    throw new Error("Function not implemented.");
}


function useGetAdressByViaCep(cep: string): { data: any; isLoading: any; refetch: any; } {
    throw new Error("Function not implemented.");
}
