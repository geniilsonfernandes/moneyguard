import Alert from '@/components/Alert';
import Input from '@/components/Input';
import Skeleton from '@/components/Skeleton';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import RenderIf from '@/components/ui/RenderIf';
import Step from '@/components/ui/Step';
import useVisibility from '@/hooks/useVisibility';
import { useAppDispatch, useAppSelector } from '@/store';
import { createBudget, getBudgets } from '@/store/reducers/budgets';
import generateHashId from '@/utils/generateHashId';
import { zodResolver } from '@hookform/resolvers/zod';
import { Wallet } from 'lucide-react';
import { useEffect } from 'react';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ExpenseFields } from '../shared/schema';

type BudgetProps = {
  errors?: FieldErrors<ExpenseFields>;
  control?: Control<ExpenseFields>;
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

const Budget = ({ control, errors: budgetErrors }: BudgetProps) => {
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
  const dispatch = useAppDispatch();
  const { data: budgets, error, loading } = useAppSelector((state) => state.budgets);
  const createBugetModal = useVisibility({});

  const bugetQuantityLimit = 10 - budgets.length;
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

        dispatch(
          createBudget({
            id: generateHashId(),
            name,
            value: 400,
            created_at: new Date()
          })
        );
        createBugetModal.onHidden();
        reset();
      }
    });
  };

  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);

  return (
    <Step>
      <div className="min-h-[375px] space-y-8">
        {error && (
          <Alert
            variant="danger"
            title="Ocorreu um erro ao receber os orcamentos"
            description="Tente novamente mais tarde"
          />
        )}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pb-8">
          {budgets.length > 0 &&
            budgets.map((buget) => (
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
                    onClick={() => onChange(buget)}>
                    <div className="flex items-center text-base justify-between">
                      <div className="flex flex-col justify-start items-start">
                        {buget.name}
                        <span className="text-zinc-400 text-xs">R$ {buget.amount} Restantes</span>
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
            disabled={bugetQuantityLimit <= 0}>
            <div className="flex items-center text-base justify-between">
              <div className="flex flex-col justify-start text-left">
                {bugetQuantityLimit <= 0
                  ? 'Limite de orçamentos atingido'
                  : ` Criar Novo orçamento`}
                <span className="text-zinc-400 text-xs">
                  {bugetQuantityLimit} espaços disponíveis
                </span>
              </div>
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
        }>
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
