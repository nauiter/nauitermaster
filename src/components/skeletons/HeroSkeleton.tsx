import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Avatar Skeleton */}
          <Skeleton className="w-56 h-56 rounded-full" />
          
          {/* Title Skeleton */}
          <div className="space-y-4 w-full max-w-4xl">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-12 w-2/3 mx-auto" />
          </div>
          
          {/* Subtitle Skeleton */}
          <Skeleton className="h-6 w-1/2 mx-auto" />
          
          {/* Buttons Skeleton */}
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    </section>
  );
};
