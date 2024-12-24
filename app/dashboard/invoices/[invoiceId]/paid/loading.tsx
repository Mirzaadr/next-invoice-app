import { Skeleton } from "@/components/ui/skeleton";

const LoadingFormEdit = () => {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <Skeleton className="w-full h-full flex-1 max-w-[500px]"/>
    </div>
  );
}

export default LoadingFormEdit;