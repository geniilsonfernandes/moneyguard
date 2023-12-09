import { cn } from '@/utils';

const PasswordCheckStatus = ({ password }: { password: string }) => {
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[\W_]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const percentage = (hasUpper ? 33.3 : 0) + (hasSpecial ? 33.3 : 0) + (hasNumber ? 33.3 : 0);

  if (!password) {
    return null;
  }

  return (
    <div className="w-full bg-slate-200 h-[2px]">
      <div
        className={cn('h-full bg-slate-500 transition-all', {
          'bg-red-500': percentage < 60,
          'bg-yellow-500': percentage >= 60 && percentage < 80,
          'bg-green-500': percentage >= 80
        })}
        style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default PasswordCheckStatus;
