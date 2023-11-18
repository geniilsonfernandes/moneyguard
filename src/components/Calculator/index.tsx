import { useState } from 'react';

const Calculator = () => {
  const numbers = [3, 2, 1, 6, 5, 4, 9, 8, 7];

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const calculateResult = () => {
    try {
      // Usa a função eval para calcular a expressão matemática inserida
      const calculatedResult = eval(input);
      setResult(calculatedResult);
      setInput(calculatedResult);
    } catch (error) {
      setResult('Erro');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="grid grid-cols-2 gap-4 text-zinc-950">
      <div className="grid grid-cols-4 gap-2">
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-1 row-start-1 col-span-3 hover:bg-slate-400 transition-all flex-center"
          onClick={clearInput}>
          limpar
        </button>
        {numbers.reverse().map((i) => (
          <button
            className="flex items-center justify-center p-2 bg-slate-100 rounded-lg w-full min-w-[48px] h-12 hover:bg-slate-200 transition-all"
            key={i}
            onClick={() => handleInput(i)}
            value={i}>
            {i}
          </button>
        ))}
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-4 row-start-1 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('/')}>
          /
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-4 row-start-2 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('*')}>
          *
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-4 row-start-3 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('-')}>
          -
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-4 row-start-4 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('+')}>
          +
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-200 rounded-lg w-full min-w-[48px] h-12 col-start-1 row-start-5 col-span-3 hover:bg-slate-400 transition-all flex-center"
          onClick={() => handleInput('0')}>
          0
        </button>
        <button
          className="flex items-center justify-center p-2 bg-slate-300 rounded-lg w-full min-w-[48px] h-12 col-start-4 row-start-5 col-span-1 hover:bg-slate-400 transition-all flex-center"
          onClick={calculateResult}>
          =
        </button>
      </div>
      <div>
        <div className="p-4 bg-slate-100 rounded-lg min-h-[100px]">
          <div className="rounded-lg text-right text-sm pb-2 font-normal text-zinc-400">
            {input}
          </div>
          <div className="rounded-lg text-right text-lg font-semibold text-zinc-500">{result}</div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
