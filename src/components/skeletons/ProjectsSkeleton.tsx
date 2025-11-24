import { Skeleton } from "@/components/ui/skeleton";

export const ProjectsSkeleton = () => {
  return (
    <section className="py-20 bg-[#0c1324]">
      <div className="container mx-auto px-6">
        {/* Title Skeleton */}
        <Skeleton className="h-10 w-64 mx-auto mb-12" />
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
