import { useAppDispatch, useAppSelector } from '@/store';
import { getExpenseById } from '@/store/reducers/getExpense';
import calculateValue from '@/utils/calculateValue';
import formatNumber from '@/utils/formatNumber';
import dayjs from 'dayjs';
import { DollarSign, Trash2, Wallet } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../Alert';
import Loader from '../Loader';
import Button from '../ui/Button';
import { clearDeleteExpense, deleteExpense } from '@/store/reducers/deleteExpense';
import { initHydrateExpenses } from '@/store/reducers/getExpenses';

const DisplayContent = ({
  isLoading,
  isError,
  children,
  hasData,
  goBack
}: {
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
  children: React.ReactNode;
  goBack?: () => void;
}) => {
  let content = null;

  if (isLoading) {
    return (
      <div className="fade-in flex-center bg-white p-8 shadow-lg h-[101vh] sm:w-5/12 w-11/12">
        <Loader />
      </div>
    );
  } else if (isError) {
    content = (
      <Alert
        variant="danger"
        title="Ocorreu um erro"
        description="Não foi possível carregar as informações"
        helpButton="Tentar novamente"
      />
    );
  } else if (hasData) {
    return children;
  } else {
    content = (
      <Alert
        variant="neutral"
        title="Nenhum dado encontrado"
        description="Não foi possível carregar as informações"
        helpButton="Tentar novamente"
      />
    );
  }
  return (
    <div className="fade-in flex flex-col justify-between bg-white p-8 shadow-lg h-[101vh] sm:w-5/12 w-11/12">
      {content}
      <Button variant="fill" width="full" onClick={goBack}>
        Voltar para a lista de despesas
      </Button>
    </div>
  );
};

const ExpenseView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useAppSelector((state) => state.expense);
  const deleteExpenseState = useAppSelector((state) => state.deleteExpense);
  const { id } = useParams() as { id: string };

  const handleToEdit = () => {
    navigate(`/expense/${id}`);
  };

  const goBack = () => {
    dispatch(clearDeleteExpense());
    navigate(`/`);
  };
  const handleDelete = () => {
    dispatch(deleteExpense({ id }));
    dispatch(initHydrateExpenses());
  };

  useEffect(() => {
    dispatch(getExpenseById({ id }));
  }, [dispatch, id]);

  return (
    <div className="fade-in bg-black/10 h-[101vh] w-full fixed left-0 top-0 z-10 flex justify-between">
      <div className="p-0 shadow-lg h-full sm:w-full w-auto flex-1" onClick={goBack} />
      {deleteExpenseState.success ? (
        <div className="fade-in flex flex-col justify-between bg-white p-8 shadow-lg h-[101vh] sm:w-5/12 w-11/12">
          <div>
            <Alert
              variant="success"
              title="Despesa excluída"
              description="A despesa foi excluída com sucesso"
            />
          </div>
          <Button variant="fill" width="full" onClick={goBack}>
            Voltar para a lista de despesas
          </Button>
        </div>
      ) : (
        <DisplayContent isLoading={loading} isError={!!error} hasData={!!data.id} goBack={goBack}>
          {!!data.id && (
            <div className="fade-in flex flex-col justify-between bg-white p-8  shadow-lg h-full sm:w-5/12 w-11/12">
              <div className="space-y-4 pt-4">
                <h3 className="font-bold text-zinc-800 gap-2 flex items-center">
                  <span className="w-[38px] h-[38px] bg-slate-100 rounded-lg flex-center">
                    <Wallet size={20} />
                  </span>
                  {data.name}
                  <span className="text-xs text-zinc-400 ml-4">{id}</span>
                </h3>
                <div className="flex items-end justify-between text-zinc-950">
                  <h1 className=" text-3xl font-normal ">{formatNumber(data.amount)}</h1>
                  <div className="w-[48px] h-[48px] border border-slate-800 rounded-full flex-center">
                    <DollarSign size={24} />
                  </div>
                </div>
                <div className="py-4 rounded-lg relative  space-y-4">
                  <div>
                    <span className="text-zinc-500">Data:</span>
                    <h1 className="text-zinc-950 text-base">
                      {dayjs(data.due_date).format('DD [de] MMMM YYYY')}
                    </h1>
                  </div>
                  <div>
                    <span className="text-zinc-500">Orçamento:</span>
                    <h1 className="text-zinc-950 text-base">{data.budget.name}</h1>
                  </div>
                  <div>
                    <span className="text-zinc-500">Recorrência:</span>
                    <h1>
                      {calculateValue(
                        data.duration || 0,
                        data.payment_mode,
                        data.periodicity_mode,
                        data.amount
                      )}
                    </h1>
                  </div>
                  <hr className="my-4 border-slate-200 border-dashed" />
                  <div>
                    <span className="text-zinc-500">Nota:</span>
                    <h1 className="text-zinc-950 text-base">
                      {data.note ? data.note : 'Sem nota'}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <Button variant="fill" width="full" onClick={handleToEdit}>
                  Editar Entrada
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  isLoading={deleteExpenseState.loading}>
                  <Trash2 />
                </Button>
              </div>
            </div>
          )}
        </DisplayContent>
      )}

      {/* {loading && (
        <div className="fade-in flex-center bg-white p-8  shadow-lg h-[101vh] sm:w-5/12 w-11/12">
          <Loader />
        </div>
      )}

      {error && (
        <div className="fade-in flex-center bg-white p-8  shadow-lg h-[101vh] sm:w-5/12 w-11/12">
          <Alert
            variant="danger"
            title="Ocorreu um erro"
            description="Não foi possivel carregar as informações"
            helpButton="Tentar novamente"
          />
        </div>
      )} */}
    </div>
  );
};

export default ExpenseView;
