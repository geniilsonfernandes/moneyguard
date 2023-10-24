import ExpenseToggle from '@/components/ExpenseToggle';
import Input, { Textarea, ValueInput } from '@/components/Input';
import Step from '@/components/ui/Step';

const Info = () => {
  return (
    <Step name="Informações da nova entrada:">
      <Input label="Nome" placeholder="Nome" state="default" name="nome" />
      <div className="py-8 space-y-8">
        <ValueInput helperText="coloque o valor" />
        <ExpenseToggle />
      </div>
      <Textarea label="Nota" placeholder="nota" state="default" />
    </Step>
  );
};

export default Info;
