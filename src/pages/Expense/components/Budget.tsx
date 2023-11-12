import Input from '@/components/Input';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Step from '@/components/ui/Step';
import useVisibility from '@/hooks/useVisibility';
import { Plus, Wallet } from 'lucide-react';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { ExpenseFields, ExpenseInfoFields } from '../shared/schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type BudgetProps = {
  erros?: FieldErrors<Partial<ExpenseInfoFields>>;
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

const Budget = ({ control, budgets, onCreateBuget, bugetQuantityLimit }: BudgetProps) => {
  const {
    control: budgetControl,
    trigger,
    getValues,
    reset,
    formState: { errors }
  } = useForm<budgetFields>({
    resolver: zodResolver(createBudgetSchema)
  });
  const createBugetModal = useVisibility({});

  const createBuget = () => {
    trigger(['budget_name']).then((isValid) => {
      if (isValid) {
        onCreateBuget(getValues().budget_name);
        createBugetModal.onHidden();
        reset();
      }
    });
  };

  return (
    <Step name="Orçamento:">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                  {buget.name}
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
              {bugetQuantityLimit <= 0 ? 'Limite de orçamentos atingido' : ` Criar Novo orçamento`}
              <span className="text-zinc-400 text-xs">
                {bugetQuantityLimit} espaços disponíveis
              </span>
            </div>
            <Plus size={18} />
          </div>
        </Button>
      </div>

      <Modal
        isOpen={createBugetModal.visible}
        onClose={createBugetModal.onHidden}
        title="Criar novo orçamento"
        footer={
          <Button width="full" onClick={() => createBuget()}>
            Criar novo orçamento
          </Button>
        }
      >
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
      </Modal>
    </Step>
  );
};

export default Budget;
