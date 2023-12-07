import { useState } from 'react';

import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

const ButtonToggleVariants = cva(
  'rounded-md h-[56px] w-full flex justify-center items-center gap-2 font-medium text-base',
  {
    variants: {
      active: {
        true: 'bg-white text-slate-950',
        false: 'transparent text-slate-300'
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

type ButtonToggleProps = {
  active?: boolean;
  type?: 'INCOME' | 'EXPENSE';
} & React.HTMLAttributes<HTMLButtonElement>;

const ButtonToggle = ({ active, type, ...props }: ButtonToggleProps) => {
  const text = type === 'INCOME' ? 'Entrada' : 'Saida';

  return (
    <button className={cn(ButtonToggleVariants({ active }))} {...props}>
      {type === 'INCOME' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />} {text}
    </button>
  );
};

type ExpenseToggleProps = {
  onChange?: (value: 'INCOME' | 'EXPENSE') => void;
  value?: 'INCOME' | 'EXPENSE';
};

const ExpenseToggle = ({ onChange, value = 'INCOME' }: ExpenseToggleProps) => {
  const [select, setSelect] = useState<'INCOME' | 'EXPENSE'>(value);

  const toggleType = (type: 'INCOME' | 'EXPENSE') => {
    setSelect(type);
    onChange?.(type);
  };

  return (
    <div className="p-1 bg-slate-100 rounded-md flex gap-2">
      <ButtonToggle
        active={select === 'INCOME'}
        type="INCOME"
        onClick={() => toggleType('INCOME')}
      />
      <ButtonToggle
        active={select === 'EXPENSE'}
        type="EXPENSE"
        onClick={() => toggleType('EXPENSE')}
      />
    </div>
  );
};

export default ExpenseToggle;
