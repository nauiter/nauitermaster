import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnimatedBadgeProps {
  icon: ReactNode;
  label: string;
  description: string;
  delay?: number;
  color?: "purple" | "cyan" | "pink" | "green" | "orange" | "blue" | "red" | "yellow";
}

const colorVariants = {
  purple: "from-[#7A5FFF] to-[#A855F7]",
  cyan: "from-[#00C4FF] to-[#0EA5E9]",
  pink: "from-[#EC4899] to-[#A855F7]",
  green: "from-[#10B981] to-[#34D399]",
  orange: "from-[#F59E0B] to-[#FB923C]",
  blue: "from-[#3B82F6] to-[#60A5FA]",
  red: "from-[#EF4444] to-[#F87171]",
  yellow: "from-[#EAB308] to-[#FDE047]",
};

const glowVariants = {
  purple: "shadow-[0_0_20px_rgba(122,95,255,0.4)]",
  cyan: "shadow-[0_0_20px_rgba(0,196,255,0.4)]",
  pink: "shadow-[0_0_20px_rgba(236,72,153,0.4)]",
  green: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
  orange: "shadow-[0_0_20px_rgba(245,158,11,0.4)]",
  blue: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
  red: "shadow-[0_0_20px_rgba(239,68,68,0.4)]",
  yellow: "shadow-[0_0_20px_rgba(234,179,8,0.4)]",
};

export const AnimatedBadge = ({ icon, label, description, delay = 0, color = "purple" }: AnimatedBadgeProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.3 }
            }}
            className="group relative cursor-pointer"
          >
            {/* Glow effect */}
            <motion.div
              className={`absolute -inset-1 bg-gradient-to-r ${colorVariants[color]} rounded-2xl blur-lg opacity-30 group-hover:opacity-70 transition-opacity`}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Badge content */}
            <div className={`relative flex flex-col items-center gap-1.5 sm:gap-2 px-3 py-3 sm:px-5 sm:py-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 ${glowVariants[color]} transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20`}>
              <motion.div
                className="text-2xl sm:text-3xl"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay,
                }}
              >
                {icon}
              </motion.div>
              
              <span className={`text-[10px] sm:text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r ${colorVariants[color]} text-center leading-tight`}>
                {label}
              </span>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="max-w-xs bg-[#0c1324]/95 backdrop-blur-xl border border-white/20 p-4 shadow-2xl"
        >
          <div className="space-y-2">
            <p className={`font-semibold text-sm text-transparent bg-clip-text bg-gradient-to-r ${colorVariants[color]}`}>
              {label}
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
