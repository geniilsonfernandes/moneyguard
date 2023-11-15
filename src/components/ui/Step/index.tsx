type StepProps = {
  children: React.ReactNode;
  name?: string;
  show?: boolean;
  className?: string;
};

const Step = ({ children, name, show = true, className }: StepProps) => {
  if (!show) {
    return null;
  }

  return (
    <div className={['space-y-2', className].join(' ')} aria-label={name}>
      {name && <h3 className="text-zinc-950 font-normal mb-1">{name}</h3>}
      <div className="relative">{children}</div>
    </div>
  );
};

export default Step;
