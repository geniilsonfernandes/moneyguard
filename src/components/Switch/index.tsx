import React from 'react';
import * as SwitchRD from '@radix-ui/react-switch';
import RenderIf from '../ui/RenderIf';

type SwitchProps = {
  onCheckedChange: (e: boolean) => void;
  checked: boolean;
  label: string;
  helpertext: string;
  name: string;
  body?: React.ReactNode;
  condition?: boolean;
  children?: React.ReactNode;
};

const Switch = ({
  onCheckedChange,
  checked,
  label,
  helpertext,
  name,
  body,
  condition = false,
  children
}: SwitchProps) => {
  return (
    <div className="rounded-lg  flex py-4 gap-4 font-medium text-base ">
      <div className="flex-1">
        <SwitchRD.Root
          className="w-[42px] h-[25px] rounded-full relative bg-slate-200  data-[state=checked]:bg-black outline-none cursor-default"
          id={name}
          onCheckedChange={onCheckedChange}
          checked={checked}>
          <SwitchRD.Thumb className="block w-[21px] h-[21px] bg-white rounded-full  transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </SwitchRD.Root>
      </div>

      <div className="flex flex-col gap-6 -mt-1 w-full">
        <div className="flex flex-col">
          <label htmlFor={name}>{label}</label>
          {helpertext && (
            <span className="text-zinc-500 text-xs first-letter:capitalize">{helpertext}</span>
          )}
        </div>
        <RenderIf condition={condition}>{body || children}</RenderIf>
      </div>
    </div>
  );
};

export default Switch;
