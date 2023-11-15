import Alert from '@/components/Alert';
import Calendar from '@/components/Calendar';
import Input from '@/components/Input';
import Button from '@/components/ui/Button';
import RenderIf from '@/components/ui/RenderIf';
import Step from '@/components/ui/Step';
import useVisibility from '@/hooks/useVisibility';
import * as Switch from '@radix-ui/react-switch';
import { Control, Controller, FieldErrors, useController, UseFormSetValue } from 'react-hook-form';
import { ExpenseFields } from '../shared/schema';
import dayjs from 'dayjs';
import Counter from '@/components/Counter';

const durationOptions = [
  {
    label: '3 mêses',
    value: 3
  },
  {
    label: '6 mêses',
    value: 6
  },
  {
    label: '12 mêses',
    value: 12
  },
  {
    label: '24 mêses',
    value: 24
  }
];

type FrequencyProps = {
  errors?: FieldErrors<ExpenseFields>;
  control?: Control<ExpenseFields>;
  setValue: UseFormSetValue<ExpenseFields>;
};

const Frequency = ({ control, setValue }: FrequencyProps) => {
  const modalCalendar = useVisibility({});
  const configFrequency = useVisibility({});

  const { field: modeControl } = useController({
    name: 'mode',
    control
  });

  const durationModeControl = useController({
    name: 'durationMode',
    control
  });

  const changeDurationMode = (mode: 'fixed' | 'custom') => {
    if (mode === 'custom') {
      setValue('duration', -1);
      setValue('durationMode', mode);
    } else {
      setValue('durationMode', mode);
    }
  };

  return (
    <div className="space-y-8 pb-8 pt-8">
      <div className="flex items-center gap-4 ">
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <div className="w-full space-y-8">
              <Input
                label="Data inicial"
                value={dayjs(value).format('DD/MM/YYYY')}
                onChange={onChange}
                width="full"
                readOnly
                className="cursor-pointer"
                onClick={() => {
                  if (modalCalendar.visible) {
                    modalCalendar.onHidden();
                  } else {
                    modalCalendar.onShow();
                  }
                }}
              />

              <RenderIf condition={modalCalendar.visible}>
                <Calendar
                  onClose={modalCalendar.onHidden}
                  onChange={(date) => {
                    onChange(date);
                  }}
                />
              </RenderIf>
            </div>
          )}
        />
      </div>

      <Step name="Tipo de frequência desse lançamento">
        <div className="rounded-lg h-[80px] flex items-center gap-4 font-medium text-base">
          <Switch.Root
            className="w-[42px] h-[25px] rounded-full relative bg-slate-200  data-[state=checked]:bg-black outline-none cursor-default"
            id="only-mode"
            onCheckedChange={(e) => {
              e ? modeControl.onChange('onlyMode') : modeControl.onChange('monthMode');
            }}
            checked={modeControl.value === 'onlyMode'}>
            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full  transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
          <label htmlFor="only-mode">Somente esse mês</label>
        </div>
        <div className="rounded-lg min-h-[80px]  font-medium text-base space-y-8">
          <div className="flex items-center gap-4">
            <Switch.Root
              className="w-[42px] h-[25px] rounded-full relative bg-slate-200  data-[state=checked]:bg-black outline-none cursor-default"
              id="month-mode"
              onCheckedChange={(e) => {
                e ? configFrequency.onShow() : configFrequency.onHidden();
                e ? modeControl.onChange('monthMode') : modeControl.onChange('onlyMode');
              }}
              checked={modeControl.value === 'monthMode'}>
              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full  transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
            <label htmlFor="month-mode">Mensal</label>
          </div>

          <RenderIf
            condition={modeControl.value === 'monthMode'}
            className="space-y-4 rounded-lg mb-8">
            <div className="flex flex-col gap-4 ">
              <span>Duração</span>
              <div className="flex flex-col sm:flex-row gap-4">
                {durationOptions.map((btn) => (
                  <Controller
                    key={btn.value}
                    control={control}
                    name="duration"
                    render={({ field: { onChange, value } }) => (
                      <Button
                        variant="outline"
                        key={btn.value}
                        onClick={() => {
                          changeDurationMode('fixed');
                          onChange(btn.value);
                        }}
                        active={btn.value === value}>
                        {btn.label}
                      </Button>
                    )}
                  />
                ))}
                <Button
                  variant="outline"
                  onClick={() => changeDurationMode('custom')}
                  active={durationModeControl.field.value === 'custom'}>
                  Colocar Manual
                </Button>
              </div>
            </div>

            <RenderIf condition={durationModeControl.field.value === 'custom'} className="pt-4">
              <Controller
                control={control}
                name="customDuration"
                render={({ field: { onChange, value } }) => (
                  <Counter onChange={(value) => onChange(Number(value))} value={value} />
                )}
              />
            </RenderIf>
          </RenderIf>
        </div>
        <RenderIf condition={modeControl.value === 'monthMode'} className="my-4">
          <Alert
            variant="neutral"
            title="Entendendo o modo mensal"
            description="Selecione a data e a duração da sua entrada mensal. "
            body={
              <div>
                <ul>
                  <li>Selecione a data em que sua entrada foi criada ou quando ela ira iniciar.</li>
                  <li>Selecione a duração da sua entrada. Ex: 4 meses</li>
                </ul>
              </div>
            }
          />
        </RenderIf>
      </Step>
      <Alert
        variant="info"
        title="ficou com duvidas?"
        description="Selecione o tipo de frequência da sua entrada, mensal ou uma entrada unica."
        helpButton="Como funciona"
        onHelpClick={() => {}}
      />
    </div>
  );
};

export default Frequency;
