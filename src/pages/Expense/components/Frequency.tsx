import Button from '@/components/ui/Button';
import RenderIf from '@/components/ui/RenderIf';
import Step from '@/components/ui/Step';
import useVisibility from '@/hooks/useVisibility';
import * as Switch from '@radix-ui/react-switch';
import { useState } from 'react';

type FrequencyForm = {
  onlyMode: boolean;
  monthMode: boolean;
  startDate: Date | null;
  durationFixed: number;
  durationCustom: number;
  config: {
    dutarionType: 'custom' | 'fixed' | null;
  };
};

const durationOptions = [
  {
    label: '1 mês',
    value: 1
  },
  {
    label: '3 mês',
    value: 3
  },
  {
    label: '6 mês',
    value: 6
  },
  {
    label: '12 mês',
    value: 12
  }
];

const Frequency = () => {
  const configFrequency = useVisibility({});

  const [form, setForm] = useState<FrequencyForm>({
    onlyMode: true,
    monthMode: false,
    startDate: null,
    durationFixed: 0,
    durationCustom: 0,
    config: {
      dutarionType: null
    }
  });

  const changeMode = (value: 'onlyMode' | 'monthMode') => {
    if (value === 'onlyMode') {
      setForm({ ...form, onlyMode: true, monthMode: false });
    } else {
      setForm({ ...form, onlyMode: false, monthMode: true });
    }
  };

  const changeDuration = (value: number | string, type: 'fixed' | 'custom') => {
    if (type === 'custom') {
      setForm({
        ...form,
        config: { dutarionType: 'custom' },
        durationFixed: 0,
        durationCustom: Number(value)
      });
    } else {
      setForm({ ...form, config: { dutarionType: 'fixed' }, durationFixed: Number(value) });
    }
  };

  return (
    <Step name="Frequência:">
      <div className="space-y-6">
        <div className="rounded-lg h-[80px] border border-slate-200  p-6 flex items-center gap-4 font-medium text-base">
          <Switch.Root
            className="w-[42px] h-[25px] rounded-full relative bg-slate-200  data-[state=checked]:bg-black outline-none cursor-default"
            id="only-mode"
            onCheckedChange={(e) => {
              e ? changeMode('onlyMode') : changeMode('monthMode');
            }}
            checked={form.onlyMode}>
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
                e ? changeMode('monthMode') : changeMode('onlyMode');
              }}
              checked={form.monthMode}>
              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full  transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
            <label htmlFor="month-mode">Mensal</label>
          </div>
          <RenderIf condition={form.monthMode}>
            <div className="flex items-center gap-4 ">
              <div className="w-full flex flex-col gap-4">
                <label htmlFor="date-1">Data inicial</label>
                <input
                  id="date-1"
                  className="h-[48px] w-full border rounded-lg p-4 focus:outline-none bg-transparent"
                  type="date"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <span>Duração</span>
              <div className="flex gap-4">
                {durationOptions.map((btn) => (
                  <Button
                    variant="outline"
                    key={btn.value}
                    onClick={() => changeDuration(btn.value, 'fixed')}
                    active={btn.value === form.durationFixed}>
                    {btn.label}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => changeDuration(1, 'custom')}
                  active={form.config.dutarionType === 'custom'}>
                  Persalizado
                </Button>
              </div>
            </div>

            <RenderIf condition={form.config.dutarionType === 'custom'}>
              <div className="flex flex-col gap-4">
                <label htmlFor="custom">Personalizado</label>
                <div className="h-[48px] max-w-[200px] border rounded-lg flex items-center gap-2">
                  <input
                    id="custom"
                    className="w-full focus:outline-none bg-transparent p-4 appearance-none "
                    type="number"
                    min={1}
                    placeholder="1"
                    value={form.durationCustom.toString()}
                    onChange={(e) => changeDuration(e.target.value, 'custom')}
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
