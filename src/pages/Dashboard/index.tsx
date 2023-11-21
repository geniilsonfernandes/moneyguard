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
import { useSession } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import formatNumber from '@/utils/formatNumber';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { data, loading, origin, hydrating } = useAppSelector((state) => state.expenses);
  const { data: budgets } = useAppSelector((state) => state.budgets);
  const navigate = useNavigate();
  const { expense, income } = useCalculateExpense(data);

  useEffect(() => {
    dispatch(getExpenses());
    dispatch(getBudgets());
  }, [dispatch, origin]);

  const handleChangeMonth = (month: string) => {
    dispatch(getExpenses({ month }));
  };

  const { session } = useSession();

  const firstName = session?.user?.firstName;

  const openExpense = (id: string) => {
    navigate(`/expense-view/${id}`);
  };

  console.log({ data });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-50 ">
      <Outlet />
      <SubHeader className="flex flex-col py-12">
        <span className="text-3xl text-zinc-500">Olá</span>
        <h4 className="text-4xl text-zinc-950 font-bold">{firstName}</h4>
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
        <div className="border p-4 rounded-lg flex gap-6 sm:flex-row sm:justify-between">
          <div className="flex gap-6 items-center">
            <div>
              <h4 className="text-neutral-700 text-lg font-bold">Despesas este mês</h4>
              <p className="text-neutral-600 text-sm">{formatNumber(expense)}</p>
            </div>
            <div aria-label="divisor" className="bg-slate-400 w-px h-10" />
            <div>
              <h4 className="text-neutral-700 text-lg font-bold">Orçamento disponível</h4>
              <p className="text-neutral-600 text-sm">{formatNumber(income)}</p>
            </div>
          </div>
          <Button
            variant="fill"
            onClick={() => {
              navigate('/expense/new');
            }}>
            novo despesa
          </Button>
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

          <MonthControl onChangeMonth={handleChangeMonth} />

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
                        expense={record}
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
