import { Banknote } from 'lucide-react';
import { PaymentEnum } from '../shared/schema';
import { useState } from 'react';

type PayMethodProps = {
  onChange?: (value: keyof typeof PaymentEnum) => void;
  value?: keyof typeof PaymentEnum;
};

const PayMethod = ({ onChange, value = 'PARCEL' }: PayMethodProps) => {
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
            payment === 'ALL' && 'bg-white'
          ].join(' ')}
          onClick={() => handleChange('ALL')}>
          Valor Total
        </button>
        <button
          className={[
            'px-4 h-12 flex items-center gap-2  rounded-lg',
            payment === 'PARCEL' && 'bg-white'
          ].join(' ')}
          onClick={() => handleChange('PARCEL')}>
          Valor Parcela
        </button>
      </div>
    </div>
  );
};

export default PayMethod;
