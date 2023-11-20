import { Info, X, ChevronRight } from 'lucide-react';
import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const AlertTextVariants = cva('', {
  variants: {
    variant: {
      danger: 'text-red-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500',
      neutral: 'text-neutral-500'
    }
  },
  defaultVariants: {
    variant: 'info'
  }
});

const AlertBorderVariants = cva('rounded-lg', {
  variants: {
    variant: {
      danger: 'border border-red-200 bg-red-50',
      success: 'border border-green-200 bg-green-50',
      warning: 'border border-yellow-200 bg-yellow-50',
      info: 'border border-blue-200 bg-blue-50',
      neutral: 'border border-neutral-200 bg-neutral-50'
    }
  }
});

const AlertVariants = cva('rounded-lg ', {
  variants: {
    variant: {
      danger: 'text-red-500 border border-red-200 bg-red-50',
      success: 'text-green-500 border border-green-200 bg-green-50',
      warning: 'text-yellow-500 border border-yellow-200 bg-yellow-50',
      info: 'text-blue-500 border border-blue-200 bg-blue-50',
      neutral: 'text-neutral-500 border border-salte-200 bg-white'
    }
  },
  defaultVariants: {
    variant: 'info'
  }
});

type AlertProps = {
  variant: VariantProps<typeof AlertVariants>['variant'];
  title: string;
  body?: React.ReactNode;
  description?: string;
  helpButton?: string;
  onClose?: () => void;
  onHelpClick?: () => void;
};

const Alert = ({
  variant,
  title,
  body,
  description,
  helpButton,
  onClose,
  onHelpClick
}: AlertProps) => {
  return (
    <div className={cn(AlertVariants({ variant }))}>
      <div className="flex p-4 flex-col sm:flex-row gap-4 relative">
        <Info size={24} className={cn('font-bold', AlertTextVariants({ variant }))} />
        <div className="space-y-2">
          <h4 className="text-neutral-700 text-base font-bold">{title}</h4>
          <p className="text-neutral-600 text-sm">{description}</p>
          {helpButton && (
            <button
              className="text-sm hover:underline flex gap-1 items-center"
              onClick={onHelpClick}>
              {helpButton} <ChevronRight size={16} />
            </button>
          )}
        </div>
        {onClose && (
          <button className="absolute top-0 right-0 m-4" onClick={onClose}>
            <X size={16} />
          </button>
        )}
      </div>
      {body && (
        <div
          className={cn(
            AlertBorderVariants({ variant }),
            'bg-white rounded-b-lg rounded-t-none p-4 border-x-0 border-b-0 text-neutral-600 text-sm'
          )}>
          {body}
        </div>
      )}
    </div>
  );
};

export default Alert;
