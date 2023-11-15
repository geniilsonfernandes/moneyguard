type CounterProps = {
  onChange: (value: string) => void;
  value: string | undefined | number;
};

const Counter = ({ onChange, value }: CounterProps) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="custom">Quantos meses?</label>
      <div className="h-[48px] w-full sm:max-w-[200px] border rounded-lg flex items-center gap-2">
        <input
          id="custom"
          className="w-full focus:outline-none bg-transparent p-4 appearance-none "
          type="number"
          min={1}
          placeholder="1"
          value={value}
          onChange={({ target }) => onChange(target.value)}
        />
        <span className="text-zinc-950 bg-slate-100 h-full flex items-center px-4">Meses</span>
      </div>
    </div>
  );
};

export default Counter;
