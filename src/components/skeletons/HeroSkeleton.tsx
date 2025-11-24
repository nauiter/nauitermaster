import { Skeleton } from "@/components/ui/skeleton";
import { AuroraBackground } from "@/components/ui/aurora-background";

export const HeroSkeleton = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0c1324] relative overflow-hidden">
      {/* Aurora Borealis Background */}
      <AuroraBackground />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Avatar Skeleton */}
          <Skeleton className="w-40 h-40 sm:w-56 sm:h-56 rounded-full" />
          
          {/* Title Skeleton */}
          <div className="space-y-3 sm:space-y-4 w-full max-w-4xl px-4">
            <Skeleton className="h-8 sm:h-12 w-3/4 mx-auto" />
            <Skeleton className="h-8 sm:h-12 w-2/3 mx-auto" />
          </div>
          
          {/* Subtitle Skeleton */}
          <Skeleton className="h-5 sm:h-6 w-4/5 sm:w-1/2 mx-auto" />
          
          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full px-4 sm:w-auto">
            <Skeleton className="h-11 sm:h-12 w-full sm:w-40" />
            <Skeleton className="h-11 sm:h-12 w-full sm:w-40" />
          </div>
        </div>
      </div>
    </section>
  );
};
