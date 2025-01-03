import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { RenderConditional } from "../RenderConditional";

export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  offset?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  error?: string;
  onClickRightIcon?: () => void;
  onClickLeftIcon?: () => void;
  className?: string;
  isPassword?: boolean;
  isTextArea?: boolean;
}

export const TextInput: React.FC<TextInputProps> = forwardRef(
  (
    {
      error,
      leftIcon,
      rightIcon,
      onClickLeftIcon,
      onClickRightIcon,
      label,
      isPassword,
      className,
      isTextArea,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    function handleInputFocus() {
      setIsFocused(true);
    }

    function handleInputBlur() {
      setIsFocused(false);
    }

    return (
      <div className="flex flex-col justify-start w-ful">
        <label className="font-semibold text-white text-sm">{label}</label>
        <div
          onBlur={handleInputBlur}
          className={`border w-full border-white bg-zinc-800 py-3 px-2 rounded-[4px] flex items-center mt-2 ${
            !error && isFocused && "ring-2 ring-slate-600"
          } ${
            error && "border-2 border-red-600"
          } transition duration-200 ease-in-out bg-white ${className}`}
        >
          <div className="mr-2" onClick={onClickLeftIcon}>
            {leftIcon}
          </div>
          <RenderConditional condition={!isTextArea}>
            <input
              value={props.value}
              onFocus={handleInputFocus}
              name={props.name}
              className={`w-full border-0 p-0 ring-0 outline-none bg-none overflow-hidden bg-zinc-800 placeholder-white text-white ${
                error && "placeholder-red-600 text-red-600"
              }`}
              {...props}
            />
          </RenderConditional>

          <RenderConditional condition={!!isTextArea}>
            <textarea
              value={props.value}
              onFocus={handleInputFocus}
              name={props.name}
              className={`w-full border-0 p-0 ring-0 outline-none bg-none overflow-hidden bg-zinc-800 placeholder-gray-400 text-white ${
                error && "placeholder-red-600 text-red-600"
              }`}
              {...props}
            />
          </RenderConditional>

          <div
            className={isPassword ? "cursor-pointer" : ""}
            onClick={onClickRightIcon}
          >
            {rightIcon}
          </div>
        </div>
      </div>
    );
  }
);
