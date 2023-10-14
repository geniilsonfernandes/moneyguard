import Amount from '@/components/Amount/Amount';
import MonthControl from '@/components/MonthControl';
import formatNumber from '@/utils/formatNumber';

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
          <Amount className="pt-7" />
        </div>
      </div>
      <div className="container">
        <div className="bg-slate-950 p-8 rounded-2xl shadow-lg mt-[-28px] text-white flex justify-between items-center">
          <MonthControl />
          <div className="space-x-2">
            <span className="uppercase">Total de despesas:</span>
            <span className="uppercase font-bold text-lg">{monthExpense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
