import ExpenseToggle from '@/components/ExpenseToggle';
import Input, { Textarea, ValueInput } from '@/components/Input';
import Step from '@/components/ui/Step';

const Info = () => {
  return (
    <Step>
      <div className="pb-8 space-y-8">
        <ExpenseToggle />
        <ValueInput helperText="coloque o valor" />
        <Input label="Nome" placeholder="Nome" state="default" name="nome" />
        <Textarea label="Nota" placeholder="nota" state="default" />
      </div>
    </Step>
  );
};

export default Info;
