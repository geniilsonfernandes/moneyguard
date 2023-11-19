import SubHeader from '@/components/Layouts/SubHeader';
import Skeleton from '@/components/Skeleton';

const Loading = () => {
  return (
    <div className="bg-slate-100 ">
      <SubHeader className="flex justify-between items-end py-12">
        <Skeleton className="h-16 w-40" />
      </SubHeader>

      <div className="container space-y-6 pb-6  -mt-6 ">
        <Skeleton className="h-40" />

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton className="h-40" key={i} />
            ))}
          </div>
          <Skeleton className="h-16" />
          <div className="flex justify-between py-4">
            <div>
              <Skeleton className="h-16 w-40" />
            </div>
            <Skeleton className="h-16 w-40" />
          </div>
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton className="h-16" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
