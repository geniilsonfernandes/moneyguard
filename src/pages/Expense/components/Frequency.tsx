import Alert from '@/components/Alert';
import Calendar from '@/components/Calendar';
import Input from '@/components/Input';
import Switch from '@/components/Switch';
import RenderIf from '@/components/ui/RenderIf';
import Step from '@/components/ui/Step';
import useVisibility from '@/hooks/useVisibility';
import calculateValue from '@/utils/calculateValue';
import dayjs from 'dayjs';
import { Banknote, ChevronDown, ChevronUp, Diff, Repeat } from 'lucide-react';
import { useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  useController,
  useWatch
} from 'react-hook-form';
import { ExpenseFields, PaymentEnum, PeriodicityEnum } from '../shared/schema';

type PayMethodProps = {
  onChange?: (value: keyof typeof PaymentEnum) => void;
  value?: keyof typeof PaymentEnum;
};

const PayMethod = ({ onChange, value = 'all' }: PayMethodProps) => {
  const [payment, setPayment] = useState<keyof typeof PaymentEnum>(value);

  const handleChange = (value: keyof typeof PaymentEnum) => {
    if (onChange) {
      onChange(value);
    }
    setPayment(value);
  };

  return (
    <div className="flex justify-between ">
      <div className="flex items-center gap-2">
        <Banknote /> Forma de Pagamento
      </div>
      <div className="flex bg-slate-100 rounded-lg text-zinc-950 p-1">
        <button
          className={[
            'px-4 h-12 flex items-center gap-2  rounded-lg',
            payment === 'all' && 'bg-white'
          ].join(' ')}
          onClick={() => handleChange('all')}>
          Valor Total
        </button>
        <button
          className={[
            'px-4 h-12 flex items-center gap-2  rounded-lg',
            payment === 'parcel' && 'bg-white'
          ].join(' ')}
          onClick={() => handleChange('parcel')}>
          Valor Parcela
        </button>
      </div>
    </div>
  );
};

const Periodicity = () => {
  return (
    <div className="flex justify-between pointer-events-none opacity-20">
      <div className="flex items-center gap-2">
        <Repeat /> Periodicidade
      </div>
      <div className="flex bg-slate-100 rounded-lg text-zinc-950">
        <button className="px-4 h-12 flex items-center gap-2  rounded-lg">
          Mensal
          <ChevronDown />
        </button>
      </div>
    </div>
  );
};

type CounterPeriocityProps = {
  onChange?: (value: number) => void;
  value?: number;
};

const CounterPeriocity = ({ onChange, value }: CounterPeriocityProps) => {
  const [counter, setCounter] = useState(value || 1);

  const changeCounter = (value: number) => {
    if (onChange) {
      onChange(value);
    }
    setCounter(value);
  };

  const increment = () => {
    changeCounter(counter + 1);
  };

  const decrement = () => {
    if (counter === 1) {
      changeCounter(1);
    }
    if (counter > 1) {
      changeCounter(counter - 1);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Diff /> Quantidade
      </div>
      <div className="flex bg-slate-100 rounded-lg text-zinc-950">
        <button className="w-12 h-12 flex-center  rounded-lg" onClick={decrement}>
          <ChevronDown />
        </button>
        <div className="px-4 h-12 flex-center  bg-slate-50">{counter}</div>
        <button className="w-12 h-12 flex-center  rounded-lg" onClick={increment}>
          <ChevronUp />
        </button>
      </div>
    </div>
  );
};

type FrequencyProps = {
  errors?: FieldErrors<ExpenseFields>;
  control?: Control<ExpenseFields>;
  setValue?: UseFormSetValue<ExpenseFields>;
};

const Frequency = ({ control }: FrequencyProps) => {
  const modalCalendar = useVisibility({});
  const configFrequency = useVisibility({});
  const duration = useWatch({
    control,
    name: 'duration'
  });
  const paymentMode = useWatch({
    control,
    name: 'paymentMode'
  });

  const { field: valueControl } = useController({
    name: 'value',
    control
  });

  const { field: periodicityControl } = useController({
    name: 'periodicityMode',
    control
  });

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

      <Step name="Tipo de recorrência desse lançamento">
        <Switch
          checked={periodicityControl.value === PeriodicityEnum.only}
          onCheckedChange={() => periodicityControl.onChange(PeriodicityEnum.only)}
          label="Não recorrente"
          helpertext="esse lancamento será cobrado uma vez"
          name="only-mode"
        />

        <Switch
          checked={periodicityControl.value === PeriodicityEnum.repeat}
          onCheckedChange={(e) => {
            e ? configFrequency.onShow() : configFrequency.onHidden();
            periodicityControl.onChange(PeriodicityEnum.repeat);
          }}
          label="Parcelar ou repetir"
          helpertext="escolha o modo de parcelamento"
          name="month-mode"
          condition={periodicityControl.value === PeriodicityEnum.repeat}>
          <div className="space-y-8">
            <Controller
              control={control}
              name="duration"
              render={({ field: { onChange, value } }) => (
                <CounterPeriocity onChange={onChange} value={value} />
              )}
            />
            <Periodicity />
            <Controller
              control={control}
              name="paymentMode"
              render={({ field: { onChange, value } }) => (
                <PayMethod onChange={onChange} value={value} />
              )}
            />

            <div>{calculateValue(duration || 0, paymentMode, 'repeat', valueControl.value)}</div>

            <Alert
              variant="neutral"
              title="Como funciona parcelar ou repetir uma entrada?"
              description="Selecione a quantas vezes deseja parcelar ou repetir uma entrada e o modo de que vai ser cobrado."
            />
          </div>
        </Switch>
        <Switch
          checked={periodicityControl.value === 'fixedMode'}
          onCheckedChange={(e) => {
            e ? periodicityControl.onChange('fixedMode') : periodicityControl.onChange('fixedMode');
          }}
          label="Fixo mensalmente"
          helpertext="será cobrado mensalmente"
          name="fixed-mode"
        />
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
