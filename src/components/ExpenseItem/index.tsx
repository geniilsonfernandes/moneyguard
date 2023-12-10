import { ChevronDownCircle, ChevronUpCircle, PanelRight } from 'lucide-react';

import ExpenseDTO from '@/http/api/DTO/ExpenseDTO';
import calculateValue from '@/utils/calculateValue';
import AmountBadge from '../AmounBadge';

export type ExpenseItemProps = {
  expense: ExpenseDTO;
  type?: 'INCOME' | 'EXPENSE';
  group?: boolean;
  name?: string;
  id?: string;
  onClick?: () => void;
};

const ExpenseItem = ({ type, group = true, id, name, onClick, expense }: ExpenseItemProps) => {
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
      onClick={handleToView}>
      <h4 className="text-zinc-950 font-normal text-base flex gap-3">
        {type === 'INCOME' ? (
          <ChevronUpCircle className="text-green-500" />
        ) : (
          <ChevronDownCircle className="text-red-500" />
        )}
        {name}
      </h4>
      <div className="flex items-center  gap-4">
        <AmountBadge
          amount={calculateValue(
            expense.duration || 0,
            expense.payment_mode,
            expense.periodicity_mode,
            expense.amount
          )}
          type={type}
        />
        <button
          onClick={handleToView}
          className="text-zinc-400  hover:bg-slate-200 h-[32px] w-[32px] flex-center rounded-lg">
          <PanelRight />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
