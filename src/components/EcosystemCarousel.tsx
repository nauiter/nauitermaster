import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface EcosystemProject {
  name: string;
  purpose: string;
  image: string;
  url: string;
}

interface EcosystemCarouselProps {
  projects: EcosystemProject[];
}

export const EcosystemCarousel = ({ projects }: EcosystemCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    // Optional: Add custom behavior on select
    api.on("select", () => {
      // Can add analytics or other behavior here
    });
  }, [api]);

  return (
    <div className="w-full max-w-6xl mx-auto px-12">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {projects.map((project, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-slate-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]">
                  {/* Image Container */}
                  <div className="p-4 flex items-center justify-center h-40 bg-slate-900">
                    <img
                      src={project.image}
                      alt={`${project.name} Logo`}
                      className="w-full h-32 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-4 text-center space-y-2 border-t border-white/10">
                    <h3 className="font-bold text-white text-base">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {project.purpose}
                    </p>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:text-white -left-6" />
        <CarouselNext className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:text-white -right-6" />
      </Carousel>
    </div>
  );
};
