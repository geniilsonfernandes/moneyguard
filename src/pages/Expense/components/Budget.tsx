import Input from '@/components/Input';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Step from '@/components/ui/Step';
import useVisibility from '@/hooks/useVisibility';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Wallet } from 'lucide-react';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ExpenseFields } from '../shared/schema';
import Alert from '@/components/Alert';
import RenderIf from '@/components/ui/RenderIf';

type BudgetProps = {
  errors?: FieldErrors<ExpenseFields>;
  control?: Control<ExpenseFields>;
  budgets: { name: string; id: string; value: number }[];
  onCreateBuget: (newName: string) => void;
  bugetQuantityLimit: number;
};

type budgetFields = {
  budget_name: string;
};
const createBudgetSchema = z.object({
  budget_name: z
    .string({
      required_error: 'O nome do orcamento deve ser informado'
    })
    .refine((value) => value.length > 0, {
      message: 'O nome do orcamento deve ser informado'
    })
});

const Budget = ({
  control,
  budgets,
  onCreateBuget,
  bugetQuantityLimit,
  errors: budgetErrors
}: BudgetProps) => {
  const {
    control: budgetControl,
    trigger,
    getValues,

    setError,
    reset,
    formState: { errors, isValid }
  } = useForm<budgetFields>({
    resolver: zodResolver(createBudgetSchema),
    mode: 'onChange'
  });
  const createBugetModal = useVisibility({});

  const createBuget = () => {
    trigger(['budget_name']).then((isValid) => {
      if (isValid) {
        const name = getValues().budget_name;

        if (budgets.some((buget) => buget.name === name)) {
          setError(
            'budget_name',
            { message: 'O nome do orcamento ja existe' },
            { shouldFocus: true }
          );
          return;
        }

        onCreateBuget(getValues().budget_name);
        createBugetModal.onHidden();
        reset();
      }
    });
  };

  return (
    <Step>
      <div className="min-h-[375px] space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pb-8">
          {budgets.map((buget) => (
            <Controller
              control={control}
              name="budget"
              key={buget.id}
              render={({ field: { onChange, value } }) => (
                <Button
                  variant="outline"
                  size="xl"
                  key={buget.name}
                  active={buget.id === value?.id}
                  onClick={() => onChange(buget)}
                >
                  <div className="flex items-center text-base justify-between">
                    <div className="flex flex-col justify-start items-start">
                      {buget.name}
                      <span className="text-zinc-400 text-xs">R$ {buget.value} Restantes</span>
                    </div>
                    <Wallet size={18} />
                  </div>
                </Button>
              )}
            />
          ))}

          <Button
            variant="outline"
            size="xl"
            onClick={() => createBugetModal.onShow()}
            disabled={bugetQuantityLimit <= 0}
          >
            <div className="flex items-center text-base justify-between">
              <div className="flex flex-col justify-start items-start">
                {bugetQuantityLimit <= 0
                  ? 'Limite de orçamentos atingido'
                  : ` Criar Novo orçamento`}
                <span className="text-zinc-400 text-xs">
                  {bugetQuantityLimit} espaços disponíveis
                </span>
              </div>
              <Plus size={18} />
            </div>
          </Button>
        </div>
        <Alert
          variant="neutral"
          title="Criar novo orçamento"
          description="Crie um novo orçamento para registrar suas entradas e saidas."
          body={
            <div>
              <p>
                Criar orçamento é uma otima opção para deixar as suas despesas organizadas em uma
                unica carteira.
              </p>
            </div>
          }
        />
        <RenderIf condition={!!budgetErrors?.budget?.name}>
          <Alert
            variant="danger"
            title="Atenção!"
            description={budgetErrors?.budget?.name?.message}
          />
        </RenderIf>
      </div>

      <Modal
        isOpen={createBugetModal.visible}
        onClose={createBugetModal.onHidden}
        title="Criar novo orçamento"
        mode="full"
        footer={
          <Button width="full" onClick={() => createBuget()} disabled={!isValid}>
            Criar novo orçamento
          </Button>
        }
      >
        <div>
          <Controller
            control={budgetControl}
            name="budget_name"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Orçamento"
                placeholder="Ex: Compras do mes"
                state="default"
                name="bugte"
                onChange={onChange}
                value={value}
                error={!!errors.budget_name}
                helperText={errors.budget_name?.message}
              />
            )}
          />
        </div>
      </Modal>
    </Step>
  );
};

export default Budget;
