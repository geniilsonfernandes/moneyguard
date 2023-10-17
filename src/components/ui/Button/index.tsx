import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const SizeVariants = cva(' ', {
  variants: {
    size: {
      small: 'px-4 text-sm rounded-lg h-[32px] flex items-center justify-center',
      medium: 'px-4 text-sm rounded-lg h-[48px] flex items-center justify-center',
      large: 'px-6 text-base rounded-lg h-[64px] flex items-center justify-center',
      xlarge: 'px-8 text-base rounded-lg h-[80px] flex items-center justify-center'
    }
  },
  defaultVariants: {}
});

const FillVariant = cva('transition duration-300', {
  variants: {
    theme: {
      slate: 'bg-slate-950 text-zinc-100 hover:bg-slate-800',
      red: 'bg-red-550 text-zinc-100 hover:bg-red-400',
      yellow: 'bg-yellow-550 text-zinc-100 hover:bg-yellow-400'
    }
  },
  defaultVariants: {
    theme: 'slate'
  }
});

const OutlineVariant = cva('', {
  variants: {
    theme: {
      slate: 'border border-slate-300 text-slate-900 hover:bg-slate-100 bg-slate-100',
      red: 'border border-red-300 text-red-500 hover:bg-red-100 bg-red-100',
      yellow: 'border border-yellow-300 text-yellow-500 hover:bg-yellow-100 bg-yellow-100'
    }
  },
  defaultVariants: {
    theme: 'slate'
  }
});

export type ButtonProps = {
  children: React.ReactNode;
  theme?: 'slate' | 'red' | 'yellow';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'outline' | 'fill';
} & React.HTMLAttributes<HTMLButtonElement>;

const Button = ({ theme, variant, size = 'medium', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        SizeVariants({ size }),
        variant === 'fill'
          ? FillVariant({
              theme
            })
          : OutlineVariant({
              theme
            })
      )}
      {...props}>
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
