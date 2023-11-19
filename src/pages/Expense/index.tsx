import Alert from '@/components/Alert';
import SubHeader from '@/components/Layouts/SubHeader';
import Loader from '@/components/Loader';
import Button from '@/components/ui/Button';
import RenderIf from '@/components/ui/RenderIf';
import { useAppDispatch, useAppSelector } from '@/store';
import { createExpense, updateExepense } from '@/store/reducers/createExpense';
import { getExpenses } from '@/store/reducers/getExpenses';
import { getExpenseById } from '@/store/reducers/getExpense';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { getBudgets } from '@/store/reducers/budgets';
import dayjs from 'dayjs';


const texts = {
  edit: {
    header: 'Editar entrada',
    button: 'Editar'
  },
  create: {
    header: 'Adicionar nova entrada',
    button: 'Salvar e continuar'
  }
}

const Expense = () => {
  const [step, setSteps] = useState<Steps>('INFO');
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.createExpense);
  const expense = useAppSelector((state) => state.expense);
  const { width, height } = {
    width: window.innerWidth - 20,
    height: window.innerHeight
  };

  const hasEdit = !id ? "create" : "edit";

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
    // validar se posso voltar
    navigate(`/`);
  };

  const changeStep = () => {
    if (step === 'INFO') {
      trigger(['name', 'value']).then((isValid) => {
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
      setSteps('FINISH');
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
    if (hasEdit) {
      const editing = await dispatch(
        updateExepense({
          data,
          id
        })
      );

      if (editing) {
        dispatch(getExpenses());
        setSteps('FINISH');
      }
      return
    }


    const d = await dispatch(
      createExpense({
        data
      })
    );

    if (d) {
      dispatch(getExpenses());
      setSteps('FINISH');
    }
  };


  useEffect(() => {
    const getExpense = async () => {
      const data = await dispatch(getExpenseById({ id }));


      if (data) {
        setValue('name', data.name);
        setValue("type", data.type)
        setValue('value', data.value);
        setValue('budget', data.budget);

        // period
        setValue('periodicity_mode', data.periodicity_mode);
        setValue('payment_mode', data.payment_mode);
        setValue("due_date", dayjs(data.due_date).toDate());
        setValue("duration", data.duration)
      }
    };

    if (id) {
      getExpense();
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);

  if (expense.loading) {
    return <div className="bg-white">
      <SubHeader
        goBack={goBack}
        title={texts[hasEdit].header}
        subTitle="Cadastre uma nova entrada para organizar seus gastos"
        className="grid grid-cols-6 gap-8"
      />
      <div className='py-20'>
        <Loader />
      </div>
    </div>
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
                    type="submit"
                  >
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
              onHelpClick={() => { }}
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
              type="submit"
            >
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
