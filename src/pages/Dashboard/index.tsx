import Alert from '@/components/Alert';
import EmptyComponent from '@/components/EmptyComponent';
import ExpenseGroup from '@/components/ExpenseGroup';
import ExpenseItem from '@/components/ExpenseItem';
import SubHeader from '@/components/Layouts/SubHeader';
import MonthControl from '@/components/MonthControl';
import Statistics from '@/components/Statistics';
import Button from '@/components/ui/Button';
import RenderIf from '@/components/ui/RenderIf';
import useCalculateExpense from '@/hooks/useCalculateExpense';
import { useAppDispatch, useAppSelector } from '@/store';
import { getBudgets } from '@/store/reducers/budgets';
import { getExpenses } from '@/store/reducers/getExpenses';
import { cn } from '@/utils';
import formatNumber from '@/utils/formatNumber';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { data, loading, origin, hydrating } = useAppSelector((state) => state.expenses);
  const { data: budgets } = useAppSelector((state) => state.budgets);
  const navigate = useNavigate();
  const { expense, income, total } = useCalculateExpense(data);

  useEffect(() => {
    dispatch(getExpenses());
    dispatch(getBudgets());
  }, [dispatch, origin]);

  const handleChangeMonth = (month: string) => {
    dispatch(getExpenses({ month }));
  };
  // tela de resumo simples
  // todos vao ter o array de periodo de datas e os que sao unico vai ter somente um item no array
  // usa mongo db

  const openExpense = (id: string) => {
    navigate(`/expense-view/${id}`);
  };

  console.log({ data });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-100 ">
      <Outlet />
      <SubHeader className="flex justify-between items-end py-12">
        {/* <SalaryAmount /> */}
      </SubHeader>

      <div className="container space-y-6 pb-6  -mt-6 ">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Statistics title="Despesas este mês" value={expense} icon="down" />
          <Statistics title="Entradas este mês" value={income} />
          <Statistics title="Saldo" value={income - expense} />
        </div>
        <Alert
          variant="neutral"
          title="Estatisticas de despesas?"
          description="As estatísticas fornecem um resumo das suas despesas deste mês, levando em conta seus gastos recentes e os meses anteriores."
        />
        <div className="bg-slate-950 p-8 rounded-lg shadow-lg text-white flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div className="text-zinc-50 flex flex-col gap-2">
            <span className="text-base">Total de despesas este mês:</span>
            <span className="uppercase font-bold text-lg">{formatNumber(total)}</span>
          </div>
          <MonthControl onChangeMonth={handleChangeMonth} />
        </div>

        <div
          className={cn('space-y-3', hydrating && 'animate-pulse pointer-events-none opacity-20')}>
          <RenderIf condition={hydrating}>
            <Alert
              title="Atualizando Despesas"
              description="Atualizando despesas..."
              variant="neutral"
            />
          </RenderIf>
          <div className="flex justify-between py-4">
            <div>
              <h1 className="font-semibold text-zinc-950 text-2xl flex">Despesas</h1>
              <p className="text-zinc-500 text-sm mt-1">controle suas despesas</p>
            </div>

            <Button
              variant="fill"
              onClick={() => {
                navigate('/expense/new');
              }}>
              Nova entrada
            </Button>
          </div>
          <div className="space-y-3">
            {budgets &&
              budgets.map(({ name, id }) => {
                const filteredExpenses = data.filter((record) => record.budget.name === name);
                if (filteredExpenses.length === 0) {
                  return null;
                }
                return (
                  <ExpenseGroup name={name} id={id} key={id} expenses={filteredExpenses}>
                    {filteredExpenses.map((record) => (
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
          </div>
          {data.length === 0 && <EmptyComponent onCreateClick={() => navigate('/expense/new')} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
