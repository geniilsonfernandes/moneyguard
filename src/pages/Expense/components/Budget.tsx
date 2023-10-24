import Input from '@/components/Input';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Step from '@/components/ui/Step';
import useVisibility from '@/hooks/useVisibility';
import { Plus, Wallet } from 'lucide-react';

const bugets = [
  {
    name: 'Casa',
    value: 100
  },
  {
    name: 'Lazer',
    value: 200
  },
  {
    name: 'Transporte',
    value: 300
  }
];

const Budget = () => {
  const createBugetModal = useVisibility({});

  return (
    <Step name="Orçamento:">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {bugets.map((buget) => (
          <Button variant="outline" size="xlarge" key={buget.name} active={buget.name === 'Casa'}>
            <div className="flex items-center text-base justify-between">
              {buget.name}
              <Wallet size={18} />
            </div>
          </Button>
        ))}

        <Button variant="outline" size="xlarge" onClick={() => createBugetModal.onShow()}>
          <div className="flex items-center text-base justify-between">
            <div className="flex flex-col justify-start items-start">
              Criar Novo orçamento
              <span className="text-zinc-400 text-xs">5 disponíveis</span>
            </div>
            <Plus size={18} />
          </div>
        </Button>
      </div>

      <Modal
        isOpen={createBugetModal.visible}
        onClose={createBugetModal.onHidden}
        title="Criar novo orçamento"
        footer={<Button width="full">Criar novo orçamento</Button>}>
        <Input label="Orçamento" placeholder="compras do mes" state="default" name="bugte" />
      </Modal>
    </Step>
  );
};

export default Budget;
