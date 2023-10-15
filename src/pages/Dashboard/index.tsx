import SalaryAmount from '@/components/SalaryAmount';
import MonthControl from '@/components/MonthControl';
import formatNumber from '@/utils/formatNumber';
import ExpenseCard from '@/components/ExpenseCard';
import ExpenseGroup from '@/components/ExpenseGroup';

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
          <SalaryAmount className="pt-7" />
        </div>
      </div>
      <div className="container space-y-6 pb-6">
        <div className="bg-slate-950 p-8 rounded-2xl shadow-lg mt-[-32px] text-white flex justify-between items-center">
          <MonthControl />
          <div className="space-x-2">
            <span className="uppercase">Total de despesas:</span>
            <span className="uppercase font-bold text-lg">{monthExpense}</span>
          </div>
        </div>
        <div className="space-y-6">
          <ExpenseCard />
          <ExpenseGroup />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
