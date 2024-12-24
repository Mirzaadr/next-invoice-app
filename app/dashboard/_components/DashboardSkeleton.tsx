import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8 min-h-[126px]'>
        <Skeleton className="w-full h-full flex-1"/>
        <Skeleton className="w-full h-full flex-1"/>
        <Skeleton className="w-full h-full flex-1"/>
        <Skeleton className="w-full h-full flex-1"/>
      </div>
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8 h-full">
        <Skeleton className="col-span-2" />
        <Skeleton className="col-span-1" />
      </div>
    </>
  );
}

export default DashboardSkeleton;