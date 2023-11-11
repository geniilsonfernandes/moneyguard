import { Wallet2 as Wallet, PenSquare, ChevronsDownUpIcon, ChevronsUpDown } from 'lucide-react';

import AmountBadge from '@/components/AmounBadge';
import formatNumber from '@/utils/formatNumber';
import useVisibility from '@/hooks/useVisibility';
import { ButtonSmall } from '../ui/Button';
import ExpenseItem from '../ExpenseItem';

const ExpenseGroup = () => {
  const { visible, toggleVisibility } = useVisibility({
    defaultVisibility: true
  });

  const totalExpense = formatNumber(100 + 300 + -200, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });

  return (
    <div className="" aria-label="expense card">
      <div className="bg-slate-50 h-[48px] flex items-center justify-between px-4 rounded-t-lg cursor-pointer hover:bg-slate-100 transition-all ">
        <h3 className="font-bold text-zinc-950 flex items-center justify-between gap-2">
          <Wallet size={20} />
          Casa
        </h3>
        <div className="flex items-center">
          <ButtonSmall
            className="bg-transparent hover:bg-slate-100"
            onClick={toggleVisibility}
            aria-label="show/hide"
          >
            {visible ? <ChevronsDownUpIcon size={20} /> : <ChevronsUpDown size={20} />}
          </ButtonSmall>
          <ButtonSmall className="bg-transparent hover:bg-slate-100" aria-label="edit">
            <PenSquare size={20} />
          </ButtonSmall>
        </div>
      </div>
      {visible && (
        <div className="grid grid-cols-1 border border-slate-100">
          <ExpenseItem type="expense" />
          <ExpenseItem type="income" />
        </div>
      )}
      <div className="bg-slate-50 h-[48px] flex items-center justify-between px-4 rounded-b-lg ">
        <span>Resumo:</span>
        <AmountBadge amount={totalExpense} />
      </div>
    </div>
  );
};

export default ExpenseGroup;
