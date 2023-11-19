import { ChevronDownCircle, ChevronRight, ChevronUpCircle } from 'lucide-react';

import formatNumber from '@/utils/formatNumber';
import AmountBadge from '../AmounBadge';

export type ExpenseItemProps = {
  type?: 'income' | 'expense';
  group?: boolean;
  value?: number;
  name?: string;
  id?: string;
  onClick?: () => void;
};

const ExpenseItem = ({ type, group = true, id, name, value = 0, onClick }: ExpenseItemProps) => {
  const expense = formatNumber(value);

  const handleToView = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={[
        'bg-white py-3 flex items-center justify-between px-4  border-b-[1px]  focus:bg-slate-100 hover:bg-slate-100 cursor-pointer transition-all',
        !group && 'border-slate-200 last:border-0',
        group && 'rounded-lg border hover:border-slate-950'
      ].join(' ')}
      aria-label={id}
      tabIndex={0}
      onClick={handleToView}
    >
      <h4 className="text-zinc-950 font-normal text-base flex gap-3">
        {type === 'income' ? (
          <ChevronUpCircle className="text-green-500" />
        ) : (
          <ChevronDownCircle className="text-red-500" />
        )}
        {name}
      </h4>
      <div className="flex items-center  gap-4">
        <AmountBadge amount={expense} type={type} />
        <button
          onClick={handleToView}
          className="text-zinc-400  hover:bg-slate-200 h-[32px] w-[32px] flex-center rounded-lg"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
