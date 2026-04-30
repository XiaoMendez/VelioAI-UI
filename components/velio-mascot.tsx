"use client"

import { cn } from "@/lib/utils"

interface VelioMascotProps {
  size?: "sm" | "md" | "lg" | "xl"
  mood?: "happy" | "thinking" | "encouraging" | "celebrating"
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
}

export function VelioMascot({ 
  size = "md", 
  mood = "happy", 
  className,
  animated = true 
}: VelioMascotProps) {
  
  return (
    <div 
      className={cn(
        "relative flex-shrink-0",
        sizeClasses[size], 
        animated && mood === "celebrating" && "animate-float",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Main circle head */}
        <circle cx="50" cy="45" r="38" fill="#3B82F6" />

        {/* Left eye */}
        <circle cx="35" cy="35" r="6" fill="#FFFFFF" />

        {/* Right eye */}
        <circle cx="65" cy="35" r="6" fill="#FFFFFF" />

        {/* Smile */}
        <path
          d="M 35 50 Q 50 60 65 50"
          stroke="#FFFFFF"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
