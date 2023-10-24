const RenderIf = ({ children, condition }: { children: React.ReactNode; condition: boolean }) => {
  return condition ? children : null;
};

export default RenderIf;
