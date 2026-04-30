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
        viewBox="0 0 200 240" 
        className="w-full h-full drop-shadow-lg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Head */}
        <rect x="50" y="20" width="100" height="80" rx="8" fill="url(#robotGradient)" filter="url(#shadow)" />

        {/* Left antenna */}
        <line x1="70" y1="20" x2="60" y2="0" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="0" r="5" fill="#1E40AF" />

        {/* Right antenna */}
        <line x1="130" y1="20" x2="140" y2="0" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" />
        <circle cx="140" cy="0" r="5" fill="#1E40AF" />

        {/* Left eye */}
        <circle cx="75" cy="45" r="12" fill="#FFFFFF" />
        <circle cx="75" cy="45" r="8" fill="#0F172A" />
        <circle cx="77" cy="43" r="3" fill="#FFFFFF" />

        {/* Right eye */}
        <circle cx="125" cy="45" r="12" fill="#FFFFFF" />
        <circle cx="125" cy="45" r="8" fill="#0F172A" />
        <circle cx="127" cy="43" r="3" fill="#FFFFFF" />

        {/* Mouth */}
        <path 
          d="M 80 70 Q 100 80 120 70" 
          stroke="#1E40AF" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round"
          className={animated && mood === "happy" ? "animate-bounce" : ""}
        />

        {/* Body/Torso */}
        <rect x="40" y="105" width="120" height="90" rx="6" fill="url(#robotGradient)" filter="url(#shadow)" />

        {/* Chest panel */}
        <rect x="60" y="115" width="80" height="70" rx="4" fill="#0EA5E9" opacity="0.8" />

        {/* Chest lights - top row */}
        <circle cx="75" cy="130" r="4" fill="#FBBF24" opacity="0.9" />
        <circle cx="100" cy="130" r="4" fill="#34D399" opacity="0.9" />
        <circle cx="125" cy="130" r="4" fill="#F87171" opacity="0.9" />

        {/* Chest lights - bottom row */}
        <circle cx="75" cy="160" r="4" fill="#34D399" opacity="0.9" />
        <circle cx="100" cy="160" r="4" fill="#F87171" opacity="0.9" />
        <circle cx="125" cy="160" r="4" fill="#FBBF24" opacity="0.9" />

        {/* Left arm */}
        <g>
          <rect x="15" y="135" width="25" height="18" rx="9" fill="url(#robotGradient)" filter="url(#shadow)" />
          <circle cx="18" cy="144" r="6" fill="#1E40AF" />
          <circle cx="37" cy="144" r="6" fill="#1E40AF" />
        </g>

        {/* Right arm */}
        <g>
          <rect x="160" y="135" width="25" height="18" rx="9" fill="url(#robotGradient)" filter="url(#shadow)" />
          <circle cx="163" cy="144" r="6" fill="#1E40AF" />
          <circle cx="182" cy="144" r="6" fill="#1E40AF" />
        </g>

        {/* Left leg */}
        <g>
          <rect x="65" y="198" width="18" height="35" rx="9" fill="url(#robotGradient)" filter="url(#shadow)" />
          <rect x="58" y="230" width="32" height="8" rx="4" fill="#1E40AF" />
        </g>

        {/* Right leg */}
        <g>
          <rect x="117" y="198" width="18" height="35" rx="9" fill="url(#robotGradient)" filter="url(#shadow)" />
          <rect x="110" y="230" width="32" height="8" rx="4" fill="#1E40AF" />
        </g>

        {/* Thinking sparkle for thinking mood */}
        {mood === "thinking" && (
          <g className="animate-pulse">
            <circle cx="160" cy="30" r="2" fill="#F59E0B" />
            <circle cx="170" cy="25" r="2.5" fill="#F59E0B" />
            <circle cx="175" cy="35" r="2" fill="#F59E0B" />
          </g>
        )}
      </svg>
    </div>
  )
}
