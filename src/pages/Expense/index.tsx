import ExpenseToggle from '@/components/ExpenseToggle';
import Input, { Textarea, ValueInput } from '@/components/Input';
import SubHeader from '@/components/Layouts/SubHeader';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Home, Plus, Wallet } from 'lucide-react';

const bugets = [
  {
    name: 'Casa',
    value: 100
  },
  {
    name: 'Lazer',
    value: 200
  },
  {
    name: 'Transporte',
    value: 300
  }
];

type StepProps = {
  children: React.ReactNode;
  name?: string;
};

const Step = ({ children, name }: StepProps) => {
  return (
    <div className="py-12 space-y-2" aria-label={name}>
      {children}
    </div>
  );
};

const Expense = () => {
  const { id } = useParams() as { id: string };
  const [values, setValues] = useState({
    nome: '',
    valor: undefined as number | undefined
  });

  useEffect(() => {
    const getRadios = async () => {
      const data = await fetch(`https://radio-world-connect.onrender.com/radio/all`);

      const radios = await data.json();

      console.log(radios);
    };
    getRadios();
  }, []);

  return (
    <div className="bg-white h-screen">
      <SubHeader>
        <div className="container">...{id}</div>
      </SubHeader>
      <div className="container">
        <Step name="Informações da entrada">
          <Input
            label="Nome"
            placeholder="Nome"
            state="default"
            name="nome"
            onChange={({ target }) => {
              setValues((prev) => ({ ...prev, nome: target.value }));
            }}
          />
          <div className="py-8 space-y-8">
            <ValueInput
              helperText="coloque o valor"
              onChange={(value) => {
                setValues((prev) => ({ ...prev, valor: value }));
              }}
            />
            <ExpenseToggle />
          </div>
          <Textarea label="Nota" placeholder="nota" state="default" />
        </Step>

        <Step name="Escolha o orçamento">
          <h3 className="text-zinc-950 font-normal">Escolha o orçamento:</h3>

          <div className="py-8 grid grid-cols-2 gap-4 ">
            {bugets.map((buget) => (
              <Button
                variant="outline"
                size="xlarge"
                key={buget.name}
                active={buget.name === 'Casa'}>
                <div className="flex items-center text-base justify-between">
                  {buget.name}
                  <Wallet size={18} />
                </div>
              </Button>
            ))}

            <Button variant="outline" size="xlarge">
              <div className="flex items-center text-base justify-between">
                <div className="flex flex-col justify-start items-start">
                  Criar Novo orçamento
                  <span className="text-zinc-400 text-xs">5 disponíveis</span>
                </div>
                <Plus size={18} />
              </div>
            </Button>
          </div>
        </Step>

        <div className="flex justify-between items-center pt-24">
          <div>
            <span className="uppercase text-zinc-950 font-normal">Resumo:</span>
            <span className="uppercase text-zinc-950 text-lg font-bold ml-4">
              R$ {values.valor || 0}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost">Cancelar</Button>
            <Button variant="fill">Avançar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
