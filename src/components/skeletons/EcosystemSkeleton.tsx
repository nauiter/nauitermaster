import { Skeleton } from "@/components/ui/skeleton";

export const EcosystemSkeleton = () => {
  return (
    <section className="py-20 bg-[#0c1324]">
      <div className="container mx-auto px-6">
        {/* Title Skeleton */}
        <Skeleton className="h-10 w-80 mx-auto mb-6 bg-white/10" />
        <Skeleton className="h-5 w-96 mx-auto mb-12 bg-white/10" />
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg bg-white/10" />
          ))}
        </div>
      </div>
    </section>
  );
};
