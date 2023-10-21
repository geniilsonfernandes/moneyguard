import { cva } from 'class-variance-authority';

export const InputVariants = cva('h-[48px] w-full border rounded-lg p-4 focus:outline-none', {
  variants: {
    state: {
      default:
        'border-slate-300 text-zinc-900 hover:bg-slate-100 focus:border-slate-400 focus:bg-slate-100 placeholder:text-zinc-500',
      error:
        'border-red-300 text-red-500 hover:bg-red-100 focus:border-red-400 focus:bg-red-100 placeholder:text-red-500',
      success:
        'border-green-300 text-green-500 hover:bg-green-100 focus:border-green-400 focus:bg-green-100 placeholder:text-green-500'
    }
  },
  defaultVariants: {
    state: 'default'
  }
});

export const TextColorVariants = cva('', {
  variants: {
    state: {
      default: 'text-zinc-500 ',
      error: 'text-red-500',
      success: 'text-green-500'
    }
  },
  defaultVariants: {
    state: 'default'
  }
});
