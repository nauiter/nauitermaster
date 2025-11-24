import { Skeleton } from "@/components/ui/skeleton";

export const AIToolsSkeleton = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1c1c1c] to-[#0c1324]">
      <div className="container mx-auto px-6">
        {/* Title Skeleton */}
        <Skeleton className="h-10 w-72 mx-auto mb-12 bg-white/10" />
        
        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4 p-6 rounded-lg bg-white/5">
              <Skeleton className="h-8 w-3/4 bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-5/6 bg-white/10" />
              <Skeleton className="h-2 w-full bg-white/10 mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
