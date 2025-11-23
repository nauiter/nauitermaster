import { useState } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  blurDataURL?: string;
}

export const LazyImage = ({ src, alt, className = "", blurDataURL }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

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
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
