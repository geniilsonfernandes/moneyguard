import CircleSVG from '@/components/CircleSVG';
import SubHeader from '@/components/Layouts/SubHeader';
import Button from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import Budget from './components/Budget';
import Frequency from './components/Frequency';
import Info from './components/Info';
import View from './components/View';
import { CreateBudgetSteps } from './components/shared';
import { ExpenseFields, createSchema, defaultValues } from './shared/schema';
import generateHashId from '@/utils/generateHashId';

const steps = {
  INFO: {
    order: 1,
    porcentage: 0.75,
    title: 'Informações da nova entrada',
    subtitle: 'Nome, valor e nota'
  },
  BUDGET: {
    order: 2,
    porcentage: 0.5,
    title: 'Orcamento',
    subtitle: 'Nome, valor e nota'
  },
  FREQUENCY: {
    order: 3,
    porcentage: 0.25,
    title: 'Frequência',
    subtitle: 'Nome, valor e nota'
  },
  FINISH: {
    order: 4,
    porcentage: 0,
    title: 'Finalizar',
    subtitle: 'Nome, valor e nota'
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
  const { id } = useParams() as { id: string };
  const [budgets, setBudgets] = useState(defaultBudgets);
  const [step, setSteps] = useState<CreateBudgetSteps>('INFO');

  const bugetQuantityLimit = 10 - budgets.length;

  const {
    control,
    formState: { errors },
    setValue,
    trigger,
    getValues
  } = useForm<ExpenseFields>({
    defaultValues: defaultValues,
    mode: 'onChange',
    resolver: zodResolver(createSchema)
  });

  const goBack = () => {
    // validar se posso voltar
    navigate(`/`);
  };

  const changeStep = () => {
    if (step === 'INFO') {
      //  VALIDAR SE PODE AVANÇAR
      trigger(['name', 'value']).then((isValid) => {
        if (isValid) {
          console.log('go to budget', getValues());

          setSteps('BUDGET');
          return;
        }
      });
      console.log(getValues(), errors);
    } else if (step === 'BUDGET') {
      console.log('go to budget', getValues());
      setSteps('FREQUENCY');
    } else if (step === 'FREQUENCY') {
      console.log(getValues(), errors);
      setSteps('FINISH');
    } else if (step === 'FINISH') {
      /// tentar salvar
    }

    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
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
    setBudgets([...budgets, createNewBudget]);
    console.log(getValues(), errors);
  };

  return (
    <div className="bg-white h-screen">
      <SubHeader className="h-full flex justify-between items-end py-8">
        <div className="h-full flex flex-col items-start justify-between ">
          <Button
            variant="outline"
            size="md"
            onClick={goBack}
            display="flex"
            align="center"
            padding="none"
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 className="font-bold text-zinc-950 text-2xl">Adicionar nova entrada {id}</h1>
        </div>
        <div className="flex items-center gap-6  sm:min-w-[350px]">
          <div className="w-[70px] h-[70px] bg-zinc-950 rounded-full text-zinc-50 text-2xl flex items-center justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <CircleSVG percentage={steps[step].porcentage} />
            </div>
            {steps[step].order}
            <span className="text-zinc-500 relative top-[3px] text-base">/4</span>
          </div>
          <div>
            <h1 className="font-bold text-zinc-950 text-2xl">{steps[step].title}</h1>
            <span className="text-zinc-400 text-base">{steps[step].subtitle}</span>
          </div>
        </div>
      </SubHeader>
      <div className="container py-8">
        <div className="min-h-[200px]">
          {step === 'INFO' && <Info erros={errors} control={control} />}
          {step === 'BUDGET' && (
            <Budget
              erros={errors}
              control={control}
              budgets={budgets}
              onCreateBuget={handleCreateBudget}
              bugetQuantityLimit={bugetQuantityLimit}
            />
          )}
          {step === 'FREQUENCY' && (
            <Frequency erros={errors} control={control} setValue={setValue} />
          )}
          {step === 'FINISH' && <View />}
        </div>

        <div className="flex justify-between items-center pt-24">
          <div>
            <span className="uppercase text-zinc-950 font-normal">Resumo:</span>
            <span className="uppercase text-zinc-950 text-lg font-bold ml-4">R$ {0}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={previousStep}>
              {step === 'INFO' ? 'Cancelar' : 'Voltar'}
            </Button>

            <Button variant="fill" onClick={changeStep}>
              {step === 'FINISH' ? 'Salvar' : 'Avançar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
