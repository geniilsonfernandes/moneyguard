export type ButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = (props: ButtonProps) => {
  return (
    <button className="w-full p-4 bg-slate-400 rounded-xl" {...props}>
      {props.children}
    </button>
  );
};

export default Button;
