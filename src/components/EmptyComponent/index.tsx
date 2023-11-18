import { FolderPlus } from 'lucide-react';
import Button from '../ui/Button';

type EmptyComponentProps = {
  onCreateClick?: () => void;
};

const EmptyComponent = ({ onCreateClick }: EmptyComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center  py-5">
      <div className="text-zinc-500 text-center space-y-8 flex flex-col items-center pb-8 ">
        <FolderPlus size={60} />
        <p className="mt-4">Parece que voce ainda não tem entradas</p>
      </div>
      <Button onClick={onCreateClick} variant="fill">
        Criar Nova Entrada
      </Button>
    </div>
  );
};

export default EmptyComponent;
