import Alert from '@/components/Alert';
import EmptyComponent from '@/components/EmptyComponent';
import ExpenseGroup from '@/components/ExpenseGroup';
import ExpenseItem from '@/components/ExpenseItem';
import SubHeader from '@/components/Layouts/SubHeader';
import MonthControl from '@/components/MonthControl';
import Statistics from '@/components/Statistics';
import Button from '@/components/ui/Button';
import useCalculateExpense from '@/hooks/useCalculateExpense';
import { useAppDispatch, useAppSelector } from '@/store';
import { getExpenses, initHydrateExpenses } from '@/store/reducers/getExpenses';
import { cn } from '@/utils';
import formatNumber from '@/utils/formatNumber';

import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { ArrowUpRight, Wallet } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { data, loading, hydrating, currentMonthExpenses, error } = useAppSelector(
    (state) => state.expenses
  );
  const { data: budgets } = useAppSelector((state) => state.budgets);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { expense, income } = useCalculateExpense(currentMonthExpenses || []);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const handleChangeMonth = (month: string) => {
    dispatch(initHydrateExpenses({ current_month: month }));
  };

  const openExpense = (id: string) => {
    navigate(`/expense-view/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-50 ">
      <Outlet />
      <SubHeader className="flex flex-col py-12">
        <span className="text-3xl text-zinc-500">Olá</span>
        <h4 className="text-4xl text-zinc-950 font-bold">{user?.name}</h4>
      </SubHeader>

      <div className="container space-y-6 pb-6  -mt-6 ">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Statistics title="Despesas este mês" value={expense} icon="down" />
          <Statistics title="Entradas este mês" value={income} />
          <Statistics title="Saldo" value={income - expense} />
        </div>
        {error && <Alert variant="danger" title="Algo deu errado" description={error} />}
        <div className="border p-4 rounded-lg bg-slate-950 text-zinc-50  flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <h2 className="text-lg font-bold">Seu orçamento mensal</h2>
            <div className="mt-4 text-xl">
              <div className="flex gap-4">
                <Wallet className="text-xl" />
                <h3>{formatNumber(user?.settings.monthly_budget || 0)}</h3>

                <span className="text-zinc-300">/mês</span>
              </div>
              <div className="text-sm text-zinc-300 mt-4">
                Iremos notificá-lo quando suas despesas estiverem próximas do seu orçamento.
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <button className="border border-slate-800 p-4 px-6 rounded-lg text-zinc-50 flex gap-2">
              Ver detalhes deste mês <ArrowUpRight />
            </button>
          </div>
        </div>
        <Alert
          variant="neutral"
          title="Estatisticas de despesas?"
          description="As estatísticas fornecem um resumo das suas despesas deste mês, levando em conta seus gastos recentes e os meses anteriores."
        />
        <div className="border p-4 rounded-lg flex gap-6 flex-col sm:flex-row sm:justify-between">
          <div className="flex gap-6 items-center">
            <div>
              <h4 className="text-neutral-700 text-lg font-bold">Despesas este mês</h4>
              <p className="text-neutral-600 text-sm">{formatNumber(expense)}</p>
            </div>
            <div aria-label="divisor" className="bg-slate-400 w-px h-10" />
            <div>
              <h4 className="text-neutral-700 text-lg font-bold">Orçamento disponível</h4>
              <p className="text-neutral-600 text-sm">
                {formatNumber(income + (user?.settings?.monthly_budget || 0))}
              </p>
            </div>
          </div>
          <Button
            className="flex gap-4"
            variant="fill"
            onClick={() => {
              navigate('/expense/new');
            }}>
            Nova entrada <Wallet />
          </Button>
        </div>

        <div
          className={cn('space-y-3', hydrating && 'animate-pulse pointer-events-none opacity-20')}>
          <MonthControl onChangeMonth={handleChangeMonth} />

          <div className="space-y-3">
            {budgets &&
              budgets.map(({ name, id }) => {
                const filteredExpenses = data.filter((record) => record.budget_id === id);
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
