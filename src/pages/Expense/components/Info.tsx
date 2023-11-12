import ExpenseToggle from '@/components/ExpenseToggle';
import Input, { Textarea, ValueInput } from '@/components/Input';
import Step from '@/components/ui/Step';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ExpenseFields, ExpenseInfoFields } from '../shared/schema';

type ExpenseToggleProps = {
  erros?: FieldErrors<Partial<ExpenseInfoFields>>;
  control?: Control<ExpenseFields>;
};

const Info = ({ erros, control }: ExpenseToggleProps) => {
  return (
    <Step>
      <div className="pb-8 space-y-8">
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <ExpenseToggle onChange={(chandedValue) => onChange(chandedValue)} value={value} />
          )}
        />

        <Controller
          control={control}
          name="value"
          render={({ field: { onChange, value } }) => (
            <ValueInput
              onChange={(changedValue = 0) => onChange(changedValue)}
              error={!!erros?.value}
              helperText={erros?.value?.message}
              value={value}
            />
          )}
        />

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
              error={!!erros?.name}
              helperText={erros?.name?.message}
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
              error={!!erros?.note}
              helperText={value}
            />
          )}
        />
      </div>
    </Step>
  );
};

export default Info;
