import { useState } from 'react';

import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

const ButtonToggleVariants = cva(
  'rounded-md h-[68px] w-full flex justify-center items-center gap-2 font-medium text-base',
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
  type?: 'income' | 'expense';
} & React.HTMLAttributes<HTMLButtonElement>;

const ButtonToggle = ({ active, type, ...props }: ButtonToggleProps) => {
  const text = type === 'income' ? 'Entrada' : 'Saida';

  return (
    <button className={cn(ButtonToggleVariants({ active }))} {...props}>
      {type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />} {text}
    </button>
  );
};

type ExpenseToggleProps = {
  onChange?: (value: 'income' | 'expense') => void;
};

const ExpenseToggle = ({ onChange }: ExpenseToggleProps) => {
  const [select, setSelect] = useState<'income' | 'expense'>('income');

  const toggleType = (type: 'income' | 'expense') => {
    setSelect(type);
    onChange?.(type);
  };

  return (
    <div className="p-1 bg-slate-100 rounded-md flex gap-2">
      <ButtonToggle
        active={select === 'income'}
        type="income"
        onClick={() => toggleType('income')}
      />
      <ButtonToggle
        active={select === 'expense'}
        type="expense"
        onClick={() => toggleType('expense')}
      />
    </div>
  );
};

export default ExpenseToggle;
