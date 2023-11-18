import ExpenseToggle from '@/components/ExpenseToggle';
import Input, { Textarea, ValueInput } from '@/components/Input';
import Step from '@/components/ui/Step';

import Alert from '@/components/Alert';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ExpenseFields } from '../shared/schema';
import RenderIf from '@/components/ui/RenderIf';
import { Calculator as CalculatorIcon } from 'lucide-react';
import useVisibility from '@/hooks/useVisibility';
import Modal from '@/components/ui/Modal';
import Calculator from '@/components/Calculator';

type ExpenseToggleProps = {
  errors?: FieldErrors<ExpenseFields>;
  control?: Control<ExpenseFields>;
};

const Info = ({ errors, control }: ExpenseToggleProps) => {
  const calculate = useVisibility();

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
            name="value"
            render={({ field: { onChange, value } }) => (
              <ValueInput
                onChange={(changedValue = 0) => onChange(changedValue)}
                error={!!errors?.value}
                helperText={errors?.value?.message}
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
        <RenderIf condition={!!errors?.name || !!errors?.value}>
          <Alert
            variant="danger"
            title="Atenção!"
            description="Preencha todos os dados para prosseguir"
            body={
              <div>
                <h5>Campos obrigatórios</h5>
                <RenderIf condition={!!errors?.name}>
                  <p>- {errors?.name?.message}</p>
                </RenderIf>
                <RenderIf condition={!!errors?.value}>
                  <p>- {errors?.value?.message}</p>
                </RenderIf>
              </div>
            }
          />
        </RenderIf>
      </div>
      <Modal
        mode="full"
        title="Calculadora"
        isOpen={calculate.visible}
        onClose={calculate.onHidden}>
        <Calculator />
      </Modal>
    </Step>
  );
};

export default Info;
