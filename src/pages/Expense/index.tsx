import SubHeader from '@/components/Layouts/SubHeader';
import Button from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Alert from '@/components/Alert';
import RenderIf from '@/components/ui/RenderIf';
import generateHashId from '@/utils/generateHashId';
import Confetti from 'react-confetti';
import Budget from './components/Budget';
import Frequency from './components/Frequency';
import Info from './components/Info';
import View from './components/View';
import { CreateBudgetSteps } from './components/shared';
import { ExpenseFields, createSchema, defaultValues } from './shared/schema';

const steps = {
  INFO: {
    order: 1,
    percentage: 0.25,
    title: 'Adicionar informações iniciais',
    subtitle: 'Forneça o nome, valor e uma nota para a entrada inicial.'
  },
  BUDGET: {
    order: 2,
    percentage: 0.5,
    title: 'Inserir detalhes de orçamento',
    subtitle: 'Insira o nome, valor e adicione uma nota para o orçamento.'
  },
  FREQUENCY: {
    order: 3,
    percentage: 0.75,
    title: 'Estabelecer frequência e data',
    subtitle: 'Configure a frequência desejada.'
  },
  FINISH: {
    order: 4,
    percentage: 0,
    title: 'Finalizar processo',
    subtitle: 'Conclua o processo de entrada de dados.'
  }
};

const defaultBudgets = [
  {
    name: 'Casa',
    id: '1',
    value: 100
  },
  {
    name: 'Lazer',
    id: '2',
    value: 200
  },
  {
    name: 'Transporte',
    id: '3',
    value: 300
  }
];

const Expense = () => {
  const navigate = useNavigate();

  const [budgets, setBudgets] = useState(defaultBudgets);
  const { width, height } = {
    width: window.innerWidth - 20,
    height: window.innerHeight
  };
  const [step, setSteps] = useState<CreateBudgetSteps>('INFO');

  const bugetQuantityLimit = 10 - budgets.length;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
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
    } else if (step === 'FINISH') {
      /// tentar salvar
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

  const handleCreateBudget = (newBudget: string) => {
    if (!newBudget) {
      return;
    }

    const createNewBudget = {
      name: newBudget,
      id: `new-${generateHashId()}`,
      value: 0
    };

    setValue('budget', createNewBudget);
    clearErrors('budget');
    setBudgets([...budgets, createNewBudget]);
  };

  const onSubmit = (data: ExpenseFields) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="bg-white">
      <SubHeader
        goBack={goBack}
        title="Adicionar nova entrada"
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
            {step === 'BUDGET' && (
              <Budget
                errors={errors}
                control={control}
                budgets={budgets}
                onCreateBuget={handleCreateBudget}
                bugetQuantityLimit={bugetQuantityLimit}
              />
            )}
            {step === 'FREQUENCY' && (
              <Frequency errors={errors} control={control} setValue={setValue} />
            )}

            <div className="flex justify-end items-center pt-8 ">
              <div className="flex gap-2">
                <Button variant="ghost" onClick={previousStep}>
                  {step === 'INFO' ? 'Cancelar' : 'Etapa anterior'}
                </Button>
                <Button variant="fill" onClick={changeStep}>
                  {
                    step === 'FREQUENCY' ? 'Confirmar e salvar' : 'Proxima etapa'
                  }
                </Button>
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
                  <Button variant="outline" onClick={previousStep}>
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
              onClick={handleSubmit(onSubmit, onInvalid)}
              disabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit">
              {isSubmitting ? '...' : 'Confirmar nova entrada'}
            </Button>
            <Confetti width={width} height={height} recycle={false} />
          </div>
        </RenderIf>
      </div>
    </div>
  );
};

export default Expense;
