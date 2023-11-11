type StepProps = {
  children: React.ReactNode;
  name?: string;
  show?: boolean;
};

const Step = ({ children, name, show = true }: StepProps) => {
  if (!show) {
    return null;
  }

  return (
    <div className="py-12 space-y-2 " aria-label={name}>
      <h3 className="text-zinc-950 font-normal">{name}</h3>
      <div className="py-8">{children}</div>
    </div>
  );
};

export default Step;
