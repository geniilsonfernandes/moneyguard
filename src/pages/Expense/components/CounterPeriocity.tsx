import { ChevronDown, ChevronUp, Diff } from "lucide-react";
import { useState } from "react";

type CounterPeriocityProps = {
    onChange?: (value: number) => void;
    value?: number;
};

const CounterPeriocity = ({ onChange, value }: CounterPeriocityProps) => {
    const [counter, setCounter] = useState(value || 1);

    const changeCounter = (value: number) => {
        if (onChange) {
            onChange(value);
        }
        setCounter(value);
    };

    const increment = () => {
        changeCounter(counter + 1);
    };

    const decrement = () => {
        if (counter === 1) {
            changeCounter(1);
        }
        if (counter > 1) {
            changeCounter(counter - 1);
        }
    };

    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <Diff /> Quantidade
            </div>
            <div className="flex bg-slate-100 rounded-lg text-zinc-950">
                <button className="w-12 h-12 flex-center  rounded-lg" onClick={decrement}>
                    <ChevronDown />
                </button>
                <div className="px-4 h-12 flex-center  bg-slate-50">{counter}</div>
                <button className="w-12 h-12 flex-center  rounded-lg" onClick={increment}>
                    <ChevronUp />
                </button>
            </div>
        </div>
    );
};

export default CounterPeriocity;