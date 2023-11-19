import { ChevronDown, Repeat } from 'lucide-react';

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

export default Periodicity;
