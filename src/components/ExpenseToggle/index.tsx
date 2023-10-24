import { useState } from 'react';

import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

const ButtonToggleVariants = cva(
  'rounded-lg h-[48px] w-full flex justify-center items-center gap-2 font-medium text-base',
  {
    variants: {
      active: {
        true: 'bg-slate-100',
        false: 'transparent'
      },
      type: {
        income: 'text-green-500',
        expense: 'text-red-500'
      }
    },
    defaultVariants: {
      active: false,
      type: 'expense'
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
    <button className={cn(ButtonToggleVariants({ active, type }))} {...props}>
      {type === 'income' ? <ArrowDownCircle /> : <ArrowUpCircle />} {text}
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
    <div className="p-2 border broder-slate-100 rounded-lg flex gap-2">
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
