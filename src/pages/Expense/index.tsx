import Alert from '@/components/Alert';
import SubHeader from '@/components/Layouts/SubHeader';
import Loader from '@/components/Loader';
import Button from '@/components/ui/Button';
import RenderIf from '@/components/ui/RenderIf';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  CreateExpensePayload,
  createExpense,
  updateExepense
} from '@/store/reducers/createExpense';
import { initHydrateExpenses } from '@/store/reducers/getExpenses';
import generateDateArray from '@/utils/generateDateArray';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Budget from './components/Budget';
import Frequency from './components/Frequency';
import Info from './components/Info';
import View from './components/View';
import { Steps } from './components/shared';
import { ExpenseFields, createSchema, defaultValues } from './shared/schema';
import { steps } from './steps';
import useQuery from '@/hooks/useQuery';

const texts = {
  edit: {
    header: 'Editar entrada',
    button: 'Editar'
  },
  create: {
    header: 'Adicionar nova entrada',
    button: 'Salvar e continuar'
  }
};

const Expense = () => {
  const [step, setSteps] = useState<Steps>('INFO');
  const { id } = useParams() as { id: string };
  const query = useQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.createExpense);
  const expense = useAppSelector((state) => state.expense);

  const { width, height } = {
    width: window.innerWidth - 20,
    height: window.innerHeight
  };

  const hasEdit = id ? 'edit' : 'create';

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    getValues
  } = useForm<ExpenseFields>({
    defaultValues: defaultValues,
    mode: 'onChange',
    resolver: zodResolver(createSchema)
  });

  const onInvalid = (errors: FieldErrors<ExpenseFields>) => console.error(errors);
  const goBack = () => {
    navigate(`/`);
  };

  const changeStep = () => {
    if (step === 'INFO') {
      trigger(['name', 'amount']).then((isValid) => {
        if (isValid) {
          setSteps('BUDGET');
          return;
        }
      });
    } else if (step === 'BUDGET') {
      trigger(['budget.name']).then((isValid) => {
        if (isValid) {
          setSteps('FREQUENCY');
        }
      });
    } else if (step === 'FREQUENCY') {
      return;
    }
  };

  const previousStep = () => {
    if (step === 'BUDGET') {
      setSteps('INFO');
      return;
    } else if (step === 'FREQUENCY') {
      setSteps('BUDGET');
      return;
    } else if (step === 'FINISH') {
      setSteps('FREQUENCY');
      return;
    }

    goBack();
  };

  const onSubmit = async (data: ExpenseFields) => {
    const expenseDuration = data.periodicity_mode === 'ONCE' ? 1 : data.duration || 1;
    const paymentMode =
      data.periodicity_mode === 'FIXED' || data.periodicity_mode === 'ONCE'
        ? 'ALL'
        : data.payment_mode;

    const payload = {
      amount: data.amount,
      due_date: data.due_date,
      name: data.name,
      user_id: 'getUser()?.user_id',
      budget_id: data.budget.id,
      duration: expenseDuration,
      note: data.note,
      payment_mode: paymentMode,
      type: data.type,
      periodicity_mode: data.periodicity_mode,
      period_dates: generateDateArray(data.due_date, expenseDuration)
    } as CreateExpensePayload;

    if (hasEdit === 'edit') {
      const editing = await dispatch(
        updateExepense({
          data: payload,
          id
        })
      );

      if (editing) {
        dispatch(initHydrateExpenses());
        setSteps('FINISH');
      }
      return;
    }

    const creating = await dispatch(createExpense({ payload }));

    if (creating) {
      dispatch(initHydrateExpenses());
      setSteps('FINISH');
    }
  };

  useEffect(() => {
    const type = query.get('type') as 'INCOME' | 'EXPENSE';
    if (type) {
      console.log(type);

      setValue('type', type);
    }
  }, []);

  useEffect(() => {
    const getExpense = async () => {
      const data = expense.data;

      if (data) {
        setValue('name', data.name);
        setValue('type', data.type);
        setValue('amount', data.amount);
        setValue('budget', data.budget);

        // period
        setValue('periodicity_mode', data.periodicity_mode);
        setValue('payment_mode', data.payment_mode);
        setValue('due_date', dayjs(data.due_date).toDate());
        setValue('duration', data.duration);
      }
    };

    if (id) {
      getExpense();
    }
  }, [id, setValue, expense]);

  if (expense.loading) {
    return (
      <div className="bg-white">
        <SubHeader
          goBack={goBack}
          title={texts[hasEdit].header}
          subTitle="Cadastre uma nova entrada para organizar seus gastos"
          className="grid grid-cols-6 gap-8"
        />
        <div className="py-20">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <SubHeader
        goBack={goBack}
        title={texts[hasEdit].header}
        subTitle="Cadastre uma nova entrada para organizar seus gastos"
        className="grid grid-cols-6 gap-8"
      />
      <div className="grid sm:grid grid-cols-6 gap-8 container py-8">
        <RenderIf condition={step !== 'FINISH'} animation="none">
          <div className="col-span-6 sm:col-span-4 flex flex-col justify-between min-h-[475px]">
            <div className="flex flex-col my-4 mb-8">
              <h2 className="font-semibold text-zinc-950 text-1xl">{steps[step].title}</h2>
              <p className="text-zinc-500 text-sm mt-1">{steps[step].subtitle}</p>

              <div className="w-full h-[4px] bg-slate-100 mt-4">
                <div
                  className="h-full bg-slate-500 transition-all"
                  style={{
                    width: `${steps[step].percentage * 100}%`
                  }}
                />
              </div>
            </div>
            {step === 'INFO' && <Info errors={errors} control={control} />}
            {step === 'BUDGET' && <Budget errors={errors} control={control} />}
            {step === 'FREQUENCY' && (
              <Frequency errors={errors} control={control} setValue={setValue} />
            )}
            <RenderIf condition={Object.keys(errors).length > 0} className="my-4">
              <Alert
                variant="danger"
                title="Atenção!"
                description="alguns campos precisam ser preenchidos corretamente"
                body={
                  <div>
                    {Object.values(errors).map((error) => (
                      <p key={error.message}>
                        {error.root?.type} {error.message}
                      </p>
                    ))}
                  </div>
                }
              />
            </RenderIf>
            <RenderIf condition={!!error?.status} className="my-4">
              <Alert
                variant="danger"
                title={error?.message || ''}
                description="Alguma coisa deu errado, tente novamente"
                body={
                  <div>
                    <p>{error?.details}</p>
                  </div>
                }
              />
            </RenderIf>

            <div className="flex justify-end items-center pt-8 ">
              <div className="flex gap-2">
                <Button variant="ghost" onClick={previousStep}>
                  {step === 'INFO' ? 'Cancelar' : 'Etapa anterior'}
                </Button>

                {step !== 'FREQUENCY' && (
                  <Button variant="fill" onClick={changeStep}>
                    Proxima etapa
                  </Button>
                )}
                {step === 'FREQUENCY' && (
                  <Button
                    variant="fill"
                    onClick={handleSubmit(onSubmit, onInvalid)}
                    disabled={loading}
                    isLoading={loading}
                    type="submit">
                    {texts[hasEdit].button}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <Alert
              variant="info"
              title="Precisando de ajuda?"
              helpButton="Saber mais"
              onHelpClick={() => {}}
            />
          </div>
        </RenderIf>
        <RenderIf condition={step === 'FINISH'} animation="none">
          <div className="col-span-6 sm:col-start-2 sm:col-end-6 pt-8 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8">
              <div className="py-8 sm:py-32">
                <div className="sm:max-w-[440px] text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-zinc-950">Tudo pronto!</h1>
                  <h1 className="text-3xl font-bold mb-4 text-zinc-950">
                    Veja ao lado os detalhes da sua nova entrada.
                  </h1>
                  <p className="text-zinc-500 mb-8">
                    Use o botão abaixo para voltar a página inicial
                  </p>
                </div>
                <div className="flex gap-2 justify-center sm:justify-start">
                  <Button variant="outline" onClick={previousStep} disabled={true}>
                    Editar entrada
                  </Button>
                </div>
              </div>
              <View expense={getValues()} />
            </div>
            <RenderIf condition={Object.keys(errors).length > 0} className="my-4">
              <Alert
                variant="danger"
                title="Atenção!"
                description="alguns campos precisam ser preenchidos corretamente"
                body={
                  <div>
                    {Object.values(errors).map((error) => (
                      <p key={error.message}>
                        {error.root?.type} {error.message}
                      </p>
                    ))}
                  </div>
                }
              />
            </RenderIf>

            <Button
              variant="fill"
              width="full"
              onClick={() => navigate('/')}
              disabled={loading}
              isLoading={loading}
              type="submit">
              {loading ? '...' : 'Confirmar e voltar para página inicial'}
            </Button>
            <Confetti width={width} height={height} recycle={false} />
          </div>
        </RenderIf>
      </div>
    </div>
  );
};

export default Expense;
