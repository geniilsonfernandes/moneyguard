import Alert from '@/components/Alert';
import EmptyComponent from '@/components/EmptyComponent';
import ExpenseGroup from '@/components/ExpenseGroup';
import ExpenseItem from '@/components/ExpenseItem';
import SubHeader from '@/components/Layouts/SubHeader';
import MonthControl from '@/components/MonthControl';
import SalaryAmount from '@/components/SalaryAmount';
import Statistics from '@/components/Statistics';
import Button from '@/components/ui/Button';
import Loading from './Loading';
import { useAppDispatch, useAppSelector } from '@/store';
import { getBudgets } from '@/store/reducers/budgets';
import {  getExpenses } from '@/store/reducers/getExpenses';
import formatNumber from '@/utils/formatNumber';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ExpenseFieldsWithId } from '@/store/storage';


const calculateExpense = (expenses: ExpenseFieldsWithId[]) => {
  return expenses.reduce((acc, record) => {
    if (record.type === 'expense') {
      return acc + record.value
    }
    if (record.type === 'income') {
      return acc - record.value
    }
    return acc
  }, 0)
}


const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { data, loading, origin } = useAppSelector((state) => state.expenses);
  const { data: budgets } = useAppSelector((state) => state.budgets);
  const navigate = useNavigate();
  const monthExpense = calculateExpense(data);


  useEffect(() => {
    dispatch( getExpenses());
    dispatch(getBudgets());
  }, [dispatch, origin]);

  const handleChangeMonth = (month: string) => {
    dispatch( getExpenses({ month }));
  };
  // tela de resumo simples
  // todos vao ter o array de periodo de datas e os que sao unico vai ter somente um item no array
  // usa mongo db

  const openExpense = (id: string) => {
    navigate(`/expense-view/${id}`);
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-100 ">
      <Outlet />
      <SubHeader className="flex justify-between items-end py-12">
        <SalaryAmount />
      </SubHeader>

      <div className="container space-y-6 pb-6  -mt-6 ">
        <div className="bg-slate-950 p-8 rounded-lg shadow-lg text-white flex flex-col gap-6 sm:flex-row sm:justify-between">
          <MonthControl onChangeMonth={handleChangeMonth} />
          <div className="text-zinc-50 flex flex-col gap-2">
            <span className="text-base">Total de despesas este mês:</span>
            <span className="uppercase font-bold text-lg">{formatNumber(monthExpense)}</span>
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
              }}
            >
              Nova entrada
            </Button>
          </div>
          {budgets &&
            budgets.map(({ name, id }) => {
              const filteredData = data.filter((record) => record.budget.name === name);
              if (filteredData.length === 0) {
                return null;
              }
              return (
                <ExpenseGroup
                  name={name}
                  id={id}
                  key={id}
                  totalExpense={calculateExpense(filteredData)}
                  totalItems={filteredData.length}
                >
                  {filteredData.map((record) => (
                    <ExpenseItem
                      key={record.id}
                      group={false}
                      id={record.id}
                      name={record.name}
                      type={record.type}
                      value={record.value}
                      onClick={() => openExpense(record.id)}
                    />
                  ))}
                </ExpenseGroup>
              );
            })}
          {data.length === 0 && <EmptyComponent onCreateClick={() => navigate('/expense/new')} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
