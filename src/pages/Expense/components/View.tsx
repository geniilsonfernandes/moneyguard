import Step from '@/components/ui/Step';
import { ArrowDownCircle } from 'lucide-react';

const View = () => {
  return (
    <Step name="Visualizar detalhes">
      <div className="flex flex-col items-center justify-center ounded-lg w-fit mx-auto min-w-[400px]">
        <div className="bg-slate-950 w-full px-8 py-4 rounded-lg relative space-y-4">
          <div className="text-red-400 pt-4">
            <ArrowDownCircle /> Saida
          </div>
          <div>
            <span className="text-zinc-500">nome:</span>
            <h1 className="text-zinc-50 text-2xl font-bold">Curso de inglês</h1>
          </div>
          <div>
            <span className="text-zinc-500">Valor:</span>
            <h1 className="text-zinc-50 text-2xl font-bold">R$: 750,00</h1>
          </div>
          <span className="z-50 absolute left-[-16px] bottom-[-16px] w-[32px] h-[32px] rounded-full bg-white " />
          <span className="z-50 absolute right-[-16px] bottom-[-16px] w-[32px] h-[32px] rounded-full bg-white " />
        </div>
        <div className="bg-slate-100 w-full px-8 py-4 rounded-lg relative  space-y-4">
          <div>
            <span className="text-zinc-500">Orçamento:</span>
            <h1 className="text-zinc-950 text-base">Casa</h1>
          </div>
          <div>
            <span className="text-zinc-500">Recorrência:</span>
            <h1 className="text-zinc-950 text-base">Mensal - 12 Meses</h1>
          </div>
          <hr className="my-4 border-slate-200 border-dashed" />
          <div>
            <span className="text-zinc-500">Nota:</span>
            <h1 className="text-zinc-950 text-base"> - - -</h1>
          </div>
        </div>
      </div>
    </Step>
  );
};

export default View;
