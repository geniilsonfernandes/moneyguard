import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

const ButtonVariants = cva('', {
  variants: {
    variant: {
      outline: 'border border-slate-200 hover:bg-slate-100',
      fill: 'bg-slate-950 hover:bg-slate-800 text-white',
      ghost: 'bg-transparent text-slate-950 hover:bg-slate-100'
    },

    active: {
      true: 'bg-slate-950 text-white hover:bg-slate-800',
      false: ''
    },

    size: {
      small: 'px-6 text-sm rounded-lg h-[32px]',
      medium: 'px-6 text-sm rounded-lg h-[48px]',
      large: 'px-6 text-base rounded-lg h-[64px]',
      xlarge: 'px-6 text-base rounded-lg h-[80px]'
    }
  },
  defaultVariants: {
    variant: 'fill',
    size: 'medium'
  }
});

export type ButtonProps = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'outline' | 'fill' | 'ghost';
  active?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

// vou te que receber a variante e cada variante ter seu estados

const Button = ({ variant = 'fill', size = 'medium', active, ...props }: ButtonProps) => {
  return (
    <button className={cn(ButtonVariants({ variant, size, active }))} {...props}>
      {props.children}
    </button>
  );
};

export type ButtonSmallProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const ButtonSmall = ({ className, ...props }: ButtonSmallProps) => {
  return (
    <button
      className={cn(
        'h-[32px] w-[32px] bg-slate-800 flex items-center justify-center rounded-lg hover:bg-slate-700 transition-all',
        className
      )}
      {...props}
    />
  );
};

export default Button;
