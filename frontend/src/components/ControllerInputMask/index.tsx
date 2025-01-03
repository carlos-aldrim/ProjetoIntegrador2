import { Control, Controller } from "react-hook-form";
import { TextInputMask, TextInputMaskProps } from "../TextInputMask";

type ControllerInputProps = {
  control: Control<any, object>;
  name: string;
  defaultValue?: string;
  rules?: any;
  mask: string;
} & Omit<TextInputMaskProps, "value">;

export const ControllerInputMask: React.FC<ControllerInputProps> = ({
  control,
  name,
  defaultValue = "",
  rules,
  mask,
  ...rest
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className="relative w-full">
              <TextInputMask
                mask={mask}
                {...field}
                {...rest}
                error={error?.message}
              />
              {error && (
                <div className="flex items-center justify-center absolute mb-10">
                  <span className="text-red-600">{error.message}</span>
                </div>
              )}
            </div>
          );
        }}
      />
    </>
  );
};