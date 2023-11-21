import { Wallet2 as Wallet } from 'lucide-react';

import AmountBadge from '@/components/AmounBadge';
import useVisibility from '@/hooks/useVisibility';
import RenderIf from '../ui/RenderIf';
import formatNumber from '@/utils/formatNumber';
import useCalculateExpense from '@/hooks/useCalculateExpense';
import { ExpenseStorageDTO } from '@/store/storage';
type ExpenseGroupProps = {
  children: React.ReactNode;
  name?: string;
  id?: string;
  expenses?: ExpenseStorageDTO[];
};
const ExpenseGroup = ({ children, name, id, expenses = [] }: ExpenseGroupProps) => {
  const { total } = useCalculateExpense(expenses);
  const { visible, toggleVisibility } = useVisibility({
    defaultVisibility: true
  });

  return (
    <div className="border rounded-lg group" aria-label="expense card">
      <div
        className=" bg-white p-2 flex items-center justify-between border border-transparent hover:border-slate-950 rounded-t-lg cursor-pointer transition-all"
        onClick={toggleVisibility}
        aria-label={id}>
        <h3 className=" text-zinc-950 flex items-center justify-between gap-2">
          <span className="w-[38px] h-[38px] bg-slate-100 rounded-lg flex-center">
            <Wallet size={20} />
          </span>
          {name}
        </h3>
        <div className="flex items-center text-zinc-400 text-sm">{expenses.length} despesa</div>
      </div>
      <RenderIf condition={visible}>
        <div className="grid grid-cols-1 border-b-[1px] border-t-[1px]  border-t-slate-200">
          {children}
        </div>
      </RenderIf>
      <div className="bg-white h-[48px] flex items-center justify-between px-4 rounded-b-lg text-zinc-400 text-sm transition-all">
        <span>Resumo:</span>
        <AmountBadge amount={formatNumber(total)} />
      </div>
    </div>
  );
};

export default ExpenseGroup;
