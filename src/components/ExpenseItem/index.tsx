import { ChevronDownCircle, ChevronUpCircle } from 'lucide-react';

import AmountBadge from '../AmounBadge';
import formatNumber from '@/utils/formatNumber';

type ExpenseItemProps = {
  type?: 'income' | 'expense';
};

const ExpenseItem = ({ type = 'income' }: ExpenseItemProps) => {
  const expense = formatNumber(100, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });

  const handleToView = () => {
    alert('to view');
  };

  return (
    <button
      className=" border-b border-slate-100 h-[48px] flex items-center justify-between px-4 last:border-b-0 focus:bg-slate-100 hover:bg-slate-100 cursor-pointer transition-all"
      tabIndex={0}
      onClick={handleToView}>
      <h4 className="text-zinc-950 font-bold flex gap-3">
        {type === 'income' ? (
          <ChevronUpCircle className="text-green-500" />
        ) : (
          <ChevronDownCircle className="text-red-500" />
        )}
        Energia (1/12)
      </h4>
      <AmountBadge amount={expense} type={type} />
    </button>
  );
};

export default ExpenseItem;
