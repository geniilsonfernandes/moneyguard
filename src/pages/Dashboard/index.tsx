import ExpenseCard from '@/components/ExpenseCard';
import ExpenseGroup from '@/components/ExpenseGroup';
import MonthControl from '@/components/MonthControl';
import SalaryAmount from '@/components/SalaryAmount';
import formatNumber from '@/utils/formatNumber';

import Button from '@/components/ui/Button';

import Alert from '@/components/Alert';
import SubHeader from '@/components/Layouts/SubHeader';
import { changeTheme } from '@/utils/changeTheme';
import { TrendingUp, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
  return (
    <div className="text-neutral-500 border border-salte-200 bg-white rounded-lg">
      <div className="p-4">
        <h3 className="font-bold text-zinc-800 gap-2 flex items-center">
          <span className="w-[38px] h-[38px] bg-slate-100 rounded-lg flex-center">
            <Wallet size={20} />
          </span>
          Economia este mês
        </h3>
        <div className="flex items-center justify-between pt-8 text-zinc-950">
          <h1 className=" text-3xl font-normal ">
            {formatNumber(100 + 300 + -200, {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2
            })}
          </h1>
          <div className="w-[48px] h-[48px] border border-slate-800 rounded-full flex-center">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const monthExpense = formatNumber(1032, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });

  return (
    <div className="bg-slate-100 ">
      <SubHeader className="flex justify-between items-end py-12">
        <SalaryAmount />
      </SubHeader>

      <div className="container space-y-6 pb-6  -mt-6 ">
        <div className="bg-slate-950 p-8 rounded-lg shadow-lg text-white flex flex-col gap-6 sm:flex-row sm:justify-between">
          <MonthControl />
          <div className="text-zinc-50 flex flex-col gap-2">
            <span className="text-base">Total de despesas este mês:</span>
            <span className="uppercase font-bold text-lg">{monthExpense}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Statistics />
            <Statistics />
            <Statistics />
          </div>
          <Alert
            variant="neutral"
            title="Estatisticas de despesas?"
            description="As estatísticas fornecem um resumo das suas despesas deste mês, levando em conta seus gastos recentes e os meses anteriores."
          />
          <div className="flex justify-between py-4">
            <div>
              <h1 className="font-semibold text-zinc-950 text-2xl">Despesas</h1>
              <p className="text-zinc-500 text-sm mt-1">controle suas despesas</p>
            </div>
            <Button
              variant="fill"
              onClick={() => {
                navigate('/expense/new');
                changeTheme('theme1');
              }}>
              Nova entrada
            </Button>
          </div>

          <ExpenseCard />
          <ExpenseGroup />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
