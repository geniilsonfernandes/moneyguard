import { Wallet2 as Wallet } from 'lucide-react';

import AmountBadge from '@/components/AmounBadge';
import useVisibility from '@/hooks/useVisibility';
import RenderIf from '../ui/RenderIf';
import formatNumber from '@/utils/formatNumber';
type ExpenseGroupProps = {
  children: React.ReactNode;
  name?: string;
  id?: string;
  totalItems?: number;
  totalExpense?: number;
};
const ExpenseGroup = ({
  children,
  name,
  id,
  totalExpense = 0,
  totalItems = 0
}: ExpenseGroupProps) => {
  const { visible, toggleVisibility } = useVisibility({
    defaultVisibility: true
  });

  return (
    <div className="shadow-md rounded-lg group" aria-label="expense card">
      <div
        className=" bg-white p-2 flex items-center justify-between border border-transparent hover:border-slate-950 rounded-t-lg cursor-pointer transition-all"
        onClick={toggleVisibility}
        aria-label={id}
      >
        <h3 className="font-bold text-zinc-950 flex items-center justify-between gap-2">
          <span className="w-[38px] h-[38px] bg-slate-100 rounded-lg flex-center">
            <Wallet size={20} />
          </span>
          {name}
        </h3>
        <div className="flex items-center text-zinc-400 text-sm">
          {totalItems === 0 ? 'Sem despesas' : <>{totalItems > 1 ? 'Uma' : totalItems} despesa</>}
        </div>
      </div>
      <RenderIf condition={visible}>
        <div className="grid grid-cols-1 border-b-[1px] border-t-[1px]  border-t-slate-200">
          {children}
        </div>
      </RenderIf>
      <div className="bg-white h-[48px] flex items-center justify-between px-4 rounded-b-lg text-zinc-400 text-sm transition-all">
        <span>Resumo:</span>
        <AmountBadge amount={formatNumber(totalExpense)} />
      </div>
    </div>
  );
};

export default ExpenseGroup;
