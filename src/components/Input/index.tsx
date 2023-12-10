import { cn } from '@/utils';
import { NumericFormat } from 'react-number-format';

import { cva } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export const InputVariants = cva(
  'h-[56px] w-full border-0 rounded-lg p-4 focus:outline-none bg-transparent',
  {
    variants: {
      state: {
        default:
          'bg-slate-100 text-zinc-900 bg-slate-200 hover:bg-slate-200 focus:border-slate-400 focus:bg-slate-200 placeholder:text-zinc-500 ',
        error:
          'bg-red-100 text-red-500 hover:bg-red-200 focus:border-red-400 focus:bg-red-100 placeholder:text-red-500',
        success:
          'bg-green-100 text-green-500 hover:bg-green-200 focus:border-green-400 focus:bg-green-100 placeholder:text-green-500'
      }
    },
    defaultVariants: {
      state: 'default'
    }
  }
);

export const TextColorVariants = cva('', {
  variants: {
    state: {
      default: 'text-zinc-950 ',
      error: 'text-red-500',
      success: 'text-green-500'
    }
  },
  defaultVariants: {
    state: 'default'
  }
});

type InputProps = {
  state?: 'default' | 'error' | 'success';
  label?: string;
  placeholder?: string;
  name?: string;
  helperText?: string;
  error?: boolean;
  type?: 'text' | 'password';
  passwordCheck?: JSX.Element;
  recoveryPasswordbutton?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

type ErrorMessageProps = {
  helperText?: string;
  state?: 'default' | 'error' | 'success';
};

const ErrorMessage = ({ helperText, state }: ErrorMessageProps) => {
  return <p className={cn(TextColorVariants({ state: state }), 'text-sm')}>{helperText}</p>;
};

const Input = ({
  state = 'default',
  label,
  placeholder,
  name,
  error,
  helperText,
  className,
  passwordCheck,
  recoveryPasswordbutton,

  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className={cn(
          TextColorVariants({ state: error ? 'error' : state }),
          'font-medium text-base flex justify-between'
        )}
        aria-label={label}>
        {label}
        {recoveryPasswordbutton && (
          <button className="text-sm text-zinc-400 hover:text-zinc-600">esqueci minha senha</button>
        )}
      </label>
      <div className="relative">
        <input
          id={name}
          placeholder={placeholder}
          className={cn(
            InputVariants({
              state: error ? 'error' : state
            }),
            className
          )}
          {...props}
          type={showPassword ? 'text' : props.type}
        />
        {passwordCheck && <div className="pt-2 px-1">{passwordCheck}</div>}
        {props.type === 'password' && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className={cn(
              'absolute top-1/2 right-4 -translate-y-1/2',
              TextColorVariants({ state: error ? 'error' : state })
            )}>
            {!showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
      {error && <ErrorMessage helperText={helperText} state={error ? 'error' : state} />}
    </div>
  );
};

type TextareaProps = {
  state?: 'default' | 'error' | 'success';
  label?: string;
  placeholder?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type labelProps = {
  name?: string;
  label?: string;
  state?: 'default' | 'error' | 'success';
};

const Label = ({ label, name, state }: labelProps) => {
  return (
    <label
      htmlFor={name}
      className={cn(TextColorVariants({ state: state }), 'font-medium text-base ')}
      aria-label={label}>
      {label}
    </label>
  );
};

export const Textarea = ({
  state = 'default',
  label,
  placeholder,
  name,
  error,
  helperText,
  ...props
}: TextareaProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Label name={name} label={label} state={error ? 'error' : state} />

      <textarea
        id={name}
        placeholder={placeholder}
        className={cn(
          InputVariants({
            state: error ? 'error' : state
          }),
          'resize-none h-[150px] w-full border-0 rounded-lg p-4 focus:outline-none'
        )}
        {...props}
      />
      {error && <ErrorMessage helperText={helperText} state={error ? 'error' : state} />}
    </div>
  );
};

type ValueInputProps = {
  helperText?: string;
  error?: boolean;
  state?: 'default' | 'error' | 'success';
  onChange?: (value: number | undefined) => void;
  value?: number;
  label?: string;
};

export const ValueInput = ({
  error,
  helperText,
  state,
  onChange,
  value,
  label
}: ValueInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label label={label} state={error ? 'error' : state} />}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            TextColorVariants({ state: error ? 'error' : state }),
            ' text-7xl font-medium'
          )}>
          R$
        </span>
        <NumericFormat
          className={cn(
            'text-zinc-750 text-7xl font-medium outline-none border-none ml-2 w-full bg-transparent',
            TextColorVariants({ state: error ? 'error' : state })
          )}
          value={value}
          placeholder="0,00"
          thousandSeparator=","
          onValueChange={(value) => {
            onChange?.(value.floatValue);
          }}
        />
      </div>
      {error && <ErrorMessage helperText={helperText} state={error ? 'error' : state} />}
    </div>
  );
};

export default Input;
