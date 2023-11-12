import { cn } from '@/utils';
import { NumericFormat } from 'react-number-format';
import { InputVariants, TextColorVariants } from './styles';

type InputProps = {
  state?: 'default' | 'error' | 'success';
  label?: string;
  placeholder?: string;
  name?: string;
  helperText?: string;
  error?: boolean;
  type?: 'text' | 'password';
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
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor={name}
        className={cn(
          TextColorVariants({ state: error ? 'error' : state }),
          'font-medium text-base '
        )}
        aria-label={label}
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        className={cn(
          InputVariants({
            state: error ? 'error' : state
          })
        )}
        {...props}
      />
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
      aria-label={label}
    >
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
          'resize-none h-[150px] w-full border rounded-lg p-4 focus:outline-none'
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
          )}
        >
          R$
        </span>
        <NumericFormat
          className={cn(
            'text-zinc-750 text-7xl font-medium outline-none border-none ml-2 w-full',
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
