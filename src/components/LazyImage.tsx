import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  blurDataURL?: string;
  loading?: "lazy" | "eager";
  /** Root margin for Intersection Observer - more aggressive loading */
  rootMargin?: string;
  /** Threshold for Intersection Observer */
  threshold?: number;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  blurDataURL, 
  loading = "lazy",
  rootMargin = "300px",
  threshold = 0.01
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === "eager");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (loading === "eager") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading, rootMargin, threshold]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur Placeholder */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Actual Image */}
      <motion.img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        loading={loading}
        decoding="async"
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        style={{
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
};
