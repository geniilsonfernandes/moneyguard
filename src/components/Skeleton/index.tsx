type SkeletonProps = {
  className?: string;
};
const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={['bg-gray-300 animate-pulse rounded-lg', className].join(' ')} />;
};

export default Skeleton;
