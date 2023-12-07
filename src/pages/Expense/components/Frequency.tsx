import Alert from '@/components/Alert';
import Calendar from '@/components/Calendar';
import Input from '@/components/Input';
import Switch from '@/components/Switch';
import RenderIf from '@/components/ui/RenderIf';
import Step from '@/components/ui/Step';
import useVisibility from '@/hooks/useVisibility';
import calculateValue from '@/utils/calculateValue';
import dayjs from 'dayjs';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  useController,
  useWatch
} from 'react-hook-form';
import { ExpenseFields, PeriodicityEnum } from '../shared/schema';
import CounterPeriocity from './CounterPeriocity';
import PayMethod from './PayMethod';
import Periodicity from './Periodicity';

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
    name: 'payment_mode'
  });

  const { field: valueControl } = useController({
    name: 'amount',
    control
  });

  const { field: periodicityControl } = useController({
    name: 'periodicity_mode',
    control
  });

  return (
    <div className="space-y-8 pb-8 pt-8">
      <div className="flex items-center gap-4 ">
        <Controller
          control={control}
          name="due_date"
          render={({ field: { onChange, value } }) => (
            <div className="w-full space-y-8">
              <Input
                label="Data de vencimento"
                name="due_date"
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
          checked={periodicityControl.value === PeriodicityEnum.ONCE}
          onCheckedChange={() => periodicityControl.onChange(PeriodicityEnum.ONCE)}
          label="Não recorrente"
          helpertext="esse lancamento será cobrado uma vez"
          name="only-mode"
        />

        <Switch
          checked={periodicityControl.value === PeriodicityEnum.MONTHLY}
          onCheckedChange={(e) => {
            e ? configFrequency.onShow() : configFrequency.onHidden();
            periodicityControl.onChange(PeriodicityEnum.MONTHLY);
          }}
          label="Parcelar ou repetir"
          helpertext="escolha o modo de parcelamento"
          name="month-mode"
          condition={periodicityControl.value === PeriodicityEnum.MONTHLY}>
          <div className="space-y-4">
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
              name="payment_mode"
              render={({ field: { onChange, value } }) => (
                <PayMethod onChange={onChange} value={value} />
              )}
            />

            <div>{calculateValue(duration || 0, paymentMode, 'MONTHLY', valueControl.value)}</div>

            <Alert
              variant="neutral"
              title="Como funciona parcelar ou repetir uma entrada?"
              description="Selecione a quantas vezes deseja parcelar ou repetir uma entrada e o modo de que vai ser cobrado."
            />
          </div>
        </Switch>
        <Switch
          checked={periodicityControl.value === PeriodicityEnum.FIXED}
          onCheckedChange={(e) => {
            e
              ? periodicityControl.onChange(PeriodicityEnum.FIXED)
              : periodicityControl.onChange(PeriodicityEnum.FIXED);
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
