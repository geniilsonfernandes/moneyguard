import Loader from '@/components/Loader';
import { cn } from '@/utils';
import { cva, VariantProps } from 'class-variance-authority';

const ButtonVariants = cva('', {
  variants: {
    size: {
      sm: 'text-base rounded-lg min-h-[32px] min-w-[32px]',
      md: 'text-base rounded-lg min-h-[48px] min-w-[48px]',
      lg: 'text-base rounded-lg min-h-[64px] min-w-[64px]',
      xl: 'text-base rounded-lg min-h-[80px] min-w-[80px]'
    },
    width: {
      full: 'w-full',
      auto: ''
    },
    padding: {
      none: '',
      sm: 'p-2 px-4',
      md: 'p-4 px-8',
      lg: 'p-6 px-12',
      xl: 'p-8 px-16'
    },
    display: {
      flex: 'flex',
      block: 'block'
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
      false: ''
    },
    align: {
      left: 'text-left justify-start items-center',
      center: 'text-center justify-center items-center',
      right: 'text-right justify-end items-center'
    }
  },
  defaultVariants: {
    size: 'md',
    width: 'auto',
    align: 'center',
    display: 'block',
    padding: 'md'
  }
});

const FillVariants = cva('bg-slate-950 text-white hover:bg-slate-800', {
  variants: {
    active: {
      true: 'bg-slate-950 text-white hover:bg-slate-800',
      false: ''
    }
  },
  defaultVariants: {}
});

const OutlineVariants = cva('bg-slate-100 hover:bg-slate-200', {
  variants: {
    active: {
      true: 'bg-slate-950 text-white hover:bg-slate-900',
      false: ''
    }
  },
  defaultVariants: {}
});

const GhostVariants = cva('text-slate-950 hover:bg-slate-100', {
  variants: {
    active: {
      true: 'bg-slate-950 text-white hover:bg-slate-800',
      false: ''
    }
  },
  defaultVariants: {}
});

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'outline' | 'fill' | 'ghost';
  active?: boolean;
  disabled?: boolean;
  size?: VariantProps<typeof ButtonVariants>['size'];
  width?: VariantProps<typeof ButtonVariants>['width'];
  padding?: VariantProps<typeof ButtonVariants>['padding'];
  display?: VariantProps<typeof ButtonVariants>['display'];
  align?: VariantProps<typeof ButtonVariants>['align'];
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

// vou te que receber a variante e cada variante ter seu estados

const Button = ({
  variant = 'fill',
  size,
  active,
  width,
  className,
  padding,
  display,
  align,
  disabled,
  type = 'button',
  isLoading,
  ...props
}: ButtonProps) => {
  const variants = {
    outline: OutlineVariants,
    fill: FillVariants,
    ghost: GhostVariants
  };

  return (
    <button
      className={cn(
        variants[variant]({ active }),
        ButtonVariants({ size, width, display, padding, align, disabled }),
        className
      )}
      type={type}
      {...props}>
      {isLoading ? <Loader /> : props.children}
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
