import SubHeader from '@/components/Layouts/SubHeader';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import CircleSVG from '@/components/CircleSVG';
import Budget from './components/Budget';
import Frequency from './components/Frequency';
import Info from './components/Info';
import { CreateBudgetSteps } from './components/shared';
import View from './components/View';

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

const Expense = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const [step, setSteps] = useState<CreateBudgetSteps>('INFO');

  const goBack = () => {
    // validar se posso voltar
    navigate(`/`);
  };

  const changeStep = () => {
    if (step === 'INFO') {
      //  VALIDAR SE PODE AVANÇAR
      setSteps('BUDGET');
    } else if (step === 'BUDGET') {
      // VALIDAR SE PODE AVANÇAR
      setSteps('FREQUENCY');
    } else if (step === 'FREQUENCY') {
      // VALIDAR SE PODE AVANÇAR
      setSteps('FINISH');
    } else if (step === 'FINISH') {
      /// tentar salvar
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  return (
    <div className="bg-white h-screen">
      <SubHeader className="h-full flex justify-between items-end py-8">
        <div className="h-full flex flex-col items-start justify-between ">
          <Button variant="outline" size="medium" onClick={goBack}>
            <div className="flex items-center text-base justify-between">
              <ArrowLeft size={18} />
            </div>
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
          {step === 'INFO' && <Info />}
          {step === 'BUDGET' && <Budget />}
          {step === 'FREQUENCY' && <Frequency />}
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
