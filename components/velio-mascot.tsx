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
        viewBox="0 0 120 140"
        className="w-full h-full drop-shadow-lg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="vmBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="vmFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#DBEAFE" />
          </linearGradient>
          <filter id="vmShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1E40AF" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Antenna */}
        <line x1="60" y1="8" x2="60" y2="18" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="6" r="4" fill="#60A5FA" />

        {/* Head — rounded square */}
        <rect x="18" y="18" width="84" height="72" rx="18" fill="url(#vmBodyGrad)" filter="url(#vmShadow)" />

        {/* Face plate */}
        <rect x="26" y="26" width="68" height="56" rx="12" fill="url(#vmFaceGrad)" />

        {/* Left eye */}
        <circle cx="44" cy="52" r="10" fill="#2563EB" />
        <circle cx="44" cy="52" r="6"  fill="#1E3A8A" />
        <circle cx="41" cy="49" r="2.5" fill="#FFFFFF" />

        {/* Right eye */}
        <circle cx="76" cy="52" r="10" fill="#2563EB" />
        <circle cx="76" cy="52" r="6"  fill="#1E3A8A" />
        <circle cx="73" cy="49" r="2.5" fill="#FFFFFF" />

        {/* Mouth — smile arc */}
        <path
          d="M 40 68 Q 60 80 80 68"
          stroke="#2563EB"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Cheek blush */}
        <ellipse cx="30" cy="62" rx="5" ry="3" fill="#BFDBFE" opacity="0.7" />
        <ellipse cx="90" cy="62" rx="5" ry="3" fill="#BFDBFE" opacity="0.7" />

        {/* Neck */}
        <rect x="50" y="90" width="20" height="10" rx="4" fill="#3B82F6" />

        {/* Body */}
        <rect x="24" y="100" width="72" height="36" rx="12" fill="url(#vmBodyGrad)" filter="url(#vmShadow)" />

        {/* Chest indicator dots */}
        <circle cx="48" cy="118" r="3.5" fill="#34D399" opacity="0.95" />
        <circle cx="60" cy="118" r="3.5" fill="#FBBF24" opacity="0.95" />
        <circle cx="72" cy="118" r="3.5" fill="#F87171" opacity="0.95" />

        {/* Left arm */}
        <rect x="8"  y="104" width="16" height="26" rx="8" fill="#3B82F6" filter="url(#vmShadow)" />
        {/* Right arm */}
        <rect x="96" y="104" width="16" height="26" rx="8" fill="#3B82F6" filter="url(#vmShadow)" />

        {/* Thinking sparkles */}
        {mood === "thinking" && (
          <g className="animate-pulse">
            <circle cx="100" cy="22" r="2"   fill="#FBBF24" />
            <circle cx="108" cy="16" r="2.5" fill="#FBBF24" />
            <circle cx="106" cy="28" r="1.5" fill="#FBBF24" />
          </g>
        )}

        {/* Celebrating stars */}
        {mood === "celebrating" && (
          <g className="animate-pulse">
            <path d="M10 20 l1.5 4 4 0 -3 2.5 1.5 4 -4-2.5 -4 2.5 1.5-4 -3-2.5 4 0z" fill="#FBBF24" />
            <path d="M105 15 l1 3 3 0 -2.5 2 1 3 -2.5-1.5 -2.5 1.5 1-3 -2.5-2 3 0z" fill="#FBBF24" />
          </g>
        )}
      </svg>
    </div>
  )
}
