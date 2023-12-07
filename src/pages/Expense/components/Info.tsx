import ExpenseToggle from '@/components/ExpenseToggle';
import Input, { Textarea, ValueInput } from '@/components/Input';
import Step from '@/components/ui/Step';

import Alert from '@/components/Alert';
import Calculator from '@/components/Calculator';
import Modal from '@/components/ui/Modal';
import useVisibility from '@/hooks/useVisibility';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { Control, Controller, FieldErrors, useController } from 'react-hook-form';
import { ExpenseFields } from '../shared/schema';

type ExpenseToggleProps = {
  errors?: FieldErrors<ExpenseFields>;
  control?: Control<ExpenseFields>;
};

const Info = ({ errors, control }: ExpenseToggleProps) => {
  const calculate = useVisibility();
  const valueControl = useController({
    name: 'amount',
    control
  });

  return (
    <Step>
      <div className="space-y-8">
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <ExpenseToggle onChange={(chandedValue) => onChange(chandedValue)} value={value} />
          )}
        />

        <div className="flex items-center justify-between">
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => (
              <ValueInput
                onChange={(changedValue = 0) => onChange(changedValue)}
                error={!!errors?.amount}
                helperText={errors?.amount?.message}
                value={value}
              />
            )}
          />
          <button
            className="flex items-center gap-2 p-2 rounded-lg"
            onClick={() => {
              calculate.visible ? calculate.onHidden() : calculate.onShow();
            }}>
            <CalculatorIcon />
          </button>
        </div>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nome da entrada"
              placeholder="Adicione o nome da entrada"
              state="default"
              name="nome"
              value={value}
              onChange={({ target }) => {
                onChange(target.value);
              }}
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="note"
          render={({ field: { onChange, value } }) => (
            <Textarea
              label="Descrição"
              placeholder="Adicione uma descrição"
              state="default"
              value={value}
              onChange={({ target }) => onChange(target.value)}
              error={!!errors?.note}
              helperText={value}
            />
          )}
        />
        <Alert
          variant="info"
          title="Precisando de ajuda?"
          description="Selecione entre entrada ou saída e adicione os detalhes da sua entrada"
          helpButton="Saber mais"
          onHelpClick={() => {}}
        />
      </div>
      <Modal
        mode="full"
        title="Calculadora"
        isOpen={calculate.visible}
        onClose={calculate.onHidden}>
        <Calculator
          onCancel={() => calculate.onHidden()}
          onComplete={(result) => {
            calculate.onHidden();
            valueControl.field.onChange(result);
          }}
        />
      </Modal>
    </Step>
  );
};

export default Info;
