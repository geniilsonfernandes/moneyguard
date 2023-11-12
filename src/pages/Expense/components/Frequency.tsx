import Button from '@/components/ui/Button';
import RenderIf from '@/components/ui/RenderIf';
import Step from '@/components/ui/Step';
import useVisibility from '@/hooks/useVisibility';
import * as Switch from '@radix-ui/react-switch';
import { Control, Controller, FieldErrors, useController, UseFormSetValue } from 'react-hook-form';
import { ExpenseFields } from '../shared/schema';

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
  erros?: FieldErrors<ExpenseFields>;
  control?: Control<ExpenseFields>;
  setValue: UseFormSetValue<ExpenseFields>;
};

const Frequency = ({ control, setValue }: FrequencyProps) => {
  const configFrequency = useVisibility({});

  const { field: modeControl } = useController({
    name: 'mode',
    control
  });

  const durationModeControl = useController({
    name: 'durationMode',
    control
  });
  const personalizedDurationControl = useController({
    name: 'customDuration',
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

  const changePersonalizedDuration = (duration: number, mode: 'fixed' | 'custom') => {
    setValue('duration', duration);
    setValue('durationMode', mode);
  };

  return (
    <Step name="Frequência:">
      <div className="space-y-6">
        <div className="rounded-lg h-[80px] border border-slate-200  p-6 flex items-center gap-4 font-medium text-base">
          <Switch.Root
            className="w-[42px] h-[25px] rounded-full relative bg-slate-200  data-[state=checked]:bg-black outline-none cursor-default"
            id="only-mode"
            onCheckedChange={(e) => {
              e ? modeControl.onChange('onlyMode') : modeControl.onChange('monthMode');
            }}
            checked={modeControl.value === 'onlyMode'}>
            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full  transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
          <label htmlFor="only-mode">Unico</label>
        </div>
        <div className="rounded-lg min-h-[80px] border border-slate-200  p-6  font-medium text-base space-y-6">
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
          <RenderIf condition={modeControl.value === 'monthMode'}>
            <div className="flex items-center gap-4 ">
              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange, value } }) => (
                  <div className="w-full flex flex-col gap-4">
                    <label htmlFor="date-1">Data</label>
                    <input
                      id="date-1"
                      className="h-[48px] w-full border rounded-lg p-4 focus:outline-none bg-transparent"
                      type="date"
                      onChange={({ target }) => {
                        onChange(target.value);
                      }}
                      value={value}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <span>Duração</span>
              <div className="flex gap-4">
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
                  Persalizado
                </Button>
              </div>
            </div>

            <RenderIf condition={durationModeControl.field.value === 'custom'}>
              <div className="flex flex-col gap-4">
                <label htmlFor="custom">Personalizado</label>
                <div className="h-[48px] max-w-[200px] border rounded-lg flex items-center gap-2">
                  <input
                    id="custom"
                    className="w-full focus:outline-none bg-transparent p-4 appearance-none "
                    type="number"
                    min={1}
                    placeholder="1"
                    value={personalizedDurationControl.field.value}
                    onChange={({ target }) =>
                      changePersonalizedDuration(Number(target.value), 'custom')
                    }
                  />
                  <span className="text-zinc-950 bg-slate-100 h-full flex items-center px-4">
                    Meses
                  </span>
                </div>
              </div>
            </RenderIf>
          </RenderIf>
        </div>
      </div>
    </Step>
  );
};

export default Frequency;
