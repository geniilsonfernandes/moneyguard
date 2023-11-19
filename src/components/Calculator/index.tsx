import { useState } from 'react';
import Button from '../ui/Button';

type CalculatorProps = {
  onComplete: (result: number) => void;
  onCancel: () => void;
};
const Calculator = ({ onCancel, onComplete }: CalculatorProps) => {
  const numbers = [3, 2, 1, 6, 5, 4, 9, 8, 7];

  const [preview, setPreview] = useState('');
  const [result, setResult] = useState('');

  const calculateChars = ['/', '*', '-', '+'];

  const handleInput = (value: string) => {
    const getLastChar = preview[preview.length - 1];

    if (calculateChars.includes(value)) {
      if (preview === '' && calculateChars.includes(value) && result === '') {
        return;
      }

      if (preview.length === 0) {
        setPreview(result + value);
        return;
      }

      if (getLastChar === value) return;

      if (calculateChars.includes(getLastChar)) {
        setPreview(preview.slice(0, -1) + value);
        return;
      }

      setPreview(preview + value);
      return;
    }

    setPreview(preview + value);
    return;
  };

  const calculateResult = () => {
    if (preview === '') return;

    try {
      const getLastChar = preview[preview.length - 1];

      if (calculateChars.includes(getLastChar)) {
        const newPreview = preview.slice(0, -1);

        const calculatedResult = eval(newPreview);
        setResult(calculatedResult);
        setPreview('');

        return;
      }

      const calculatedResult = eval(preview);
      setResult(calculatedResult);
      setPreview('');
    } catch (error) {
      setResult('Erro');
    }
  };

  const clearInput = () => {
    setResult('');
    setPreview('');
  };

  const handleConfirm = () => {
    if (result === 'Erro') return;
    if (result === '') {
      clearInput();
      onCancel();
      return;
    }
    onComplete(Number(result));
    onCancel();
    clearInput();
  };

  return (
    <div className="grid grid-cols-2 gap-4 text-zinc-950">
      <div className="grid grid-cols-4 gap-2">
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-1 row-start-1 col-span-3 hover:bg-slate-400 transition-all flex-center"
          onClick={clearInput}
        >
          Limpar
        </button>
        {numbers.reverse().map((i) => (
          <button
            className="flex items-center justify-center p-2 bg-slate-100 rounded-lg w-full min-w-[48px] h-12 hover:bg-slate-200 transition-all"
            key={i}
            onClick={() => handleInput(i.toString())}
            value={i}
          >
            {i}
          </button>
        ))}
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-4 row-start-1 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('/')}
        >
          /
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-4 row-start-2 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('*')}
        >
          *
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-4 row-start-3 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('-')}
        >
          -
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-4 row-start-4 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('+')}
        >
          +
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-1 row-start-5 col-span-2 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('0')}
        >
          0
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-300 rounded-lg w-full min-w-[48px] h-12 col-start-3 row-start-5 col-span-2 hover:bg-slate-400 transition-all flex-center"
          onClick={calculateResult}
        >
          =
        </button>
      </div>
      <div className="flex flex-col justify-between">
        <div className="p-4 bg-slate-100 rounded-lg ">
          <div className="h-6 text-right text-sm pb-2 font-normal text-zinc-400">{preview}</div>
          <div className="text-right text-lg font-semibold text-zinc-500  h-8">{result}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={handleConfirm}>Confirmar</Button>
          <Button variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
