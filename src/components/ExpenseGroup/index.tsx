import { Wallet2 as Wallet } from 'lucide-react';

import AmountBadge from '@/components/AmounBadge';
import useVisibility from '@/hooks/useVisibility';
import formatNumber from '@/utils/formatNumber';
import ExpenseItem from '../ExpenseItem';
import RenderIf from '../ui/RenderIf';

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
    <div className="shadow-md rounded-lg group" aria-label="expense card">
      <div
        className=" bg-white p-2 flex items-center justify-between border border-transparent hover:border-slate-950   rounded-t-lg cursor-pointer transition-all"
        onClick={toggleVisibility}>
        <h3 className="font-bold text-zinc-950 flex items-center justify-between gap-2">
          <span className="w-[38px] h-[38px] bg-slate-100 rounded-lg flex-center">
            <Wallet size={20} />
          </span>
          Casa
        </h3>
        <div className="flex items-center">
          <span className="text-zinc-400 text-sm">10 despesas</span>
        </div>
      </div>
      <RenderIf condition={visible}>
        <div className="grid grid-cols-1 border-b-[1px] border-t-[1px]  border-t-slate-200">
          <ExpenseItem type="expense" group={false} />
          <ExpenseItem type="income" group={false} />
        </div>
      </RenderIf>
      <div className="bg-white h-[48px] flex items-center justify-between px-4 rounded-b-lg text-zinc-400 text-sm transition-all">
        <span>Resumo:</span>
        <AmountBadge amount={totalExpense} />
      </div>
    </div>
  );
};

export default ExpenseGroup;
