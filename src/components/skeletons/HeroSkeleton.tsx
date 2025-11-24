import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#05010E] via-[#0A1A2F] to-[#0C1222] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(122, 95, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 196, 255, 0.1) 0%, transparent 50%)',
        }}
      />
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
