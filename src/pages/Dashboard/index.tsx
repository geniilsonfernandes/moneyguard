import SalaryAmount from '@/components/SalaryAmount';
import MonthControl from '@/components/MonthControl';
import formatNumber from '@/utils/formatNumber';
import ExpenseCard from '@/components/ExpenseCard';
import ExpenseGroup from '@/components/ExpenseGroup';

import { Info } from 'lucide-react';
import Button from '@/components/ui/Button';

const Dashboard = () => {
  const monthExpense = formatNumber(1032, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });

  return (
    <div>
      <div className="bg-slate-100 w-full pt-4 pb-14">
        <div className="container">
          <nav className="flex bg-white rounded-lg  h-[48px]"> </nav>
          <div className="flex justify-between items-end">
            <SalaryAmount className="pt-7" />
            <Button variant="fill">Nova Despesa</Button>
          </div>
        </div>
      </div>
      <div className="container space-y-6 pb-6">
        <div className="bg-slate-950 p-8 rounded-2xl shadow-lg mt-[-32px] text-white flex justify-between items-center">
          <MonthControl />
          <div className="space-x-2 text-zinc-50">
            <span className="uppercase">Total de despesas:</span>
            <span className="uppercase font-bold text-lg ">{monthExpense}</span>
          </div>
        </div>
        <div className="space-y-6">
          <div className="border border-slate-100 p-4 rounded-2xl">
            <div className="space-y-2">
              <Info size={20} className=" text-zinc-950 font-bold" />
              <p className="text-zinc-700">
                Selecione uma categoria e veja detalhes da sua despesa de uma maneira simples e
                agrupada
              </p>
            </div>
          </div>
          <ExpenseCard />
          <ExpenseGroup />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
