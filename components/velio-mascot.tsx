"use client"

import { cn } from "@/lib/utils"

interface VelioMascotProps {
  size?: "sm" | "md" | "lg" | "xl"
  mood?: "happy" | "thinking" | "encouraging" | "celebrating"
  className?: string
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
}

export function VelioMascot({ size = "md", mood = "happy", className }: VelioMascotProps) {
  // Velio is represented as a stylized car air freshener
  // Colors: light blue, mint green, white
  
  const getExpression = () => {
    switch (mood) {
      case "happy":
        return { eyes: "^", mouth: "smile" }
      case "thinking":
        return { eyes: "o", mouth: "hmm" }
      case "encouraging":
        return { eyes: "*", mouth: "smile" }
      case "celebrating":
        return { eyes: "^", mouth: "big-smile" }
      default:
        return { eyes: "^", mouth: "smile" }
    }
  }

  const expression = getExpression()

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Air freshener body */}
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* String/Rope */}
        <path
          d="M50 0 L50 15"
          stroke="var(--velio-blue)"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="50" cy="5" r="4" fill="var(--velio-blue)" />
        
        {/* Main body - pine tree shape (air freshener) */}
        <path
          d="M50 15 
             L85 55 L70 55 
             L90 85 L65 85 
             L75 115 L25 115 
             L35 85 L10 85 
             L30 55 L15 55 
             Z"
          fill="url(#velioGradient)"
          stroke="var(--velio-blue)"
          strokeWidth="2"
        />
        
        {/* Face background circle */}
        <circle cx="50" cy="70" r="25" fill="white" opacity="0.9" />
        
        {/* Eyes */}
        {expression.eyes === "^" && (
          <>
            <path d="M38 65 Q42 60 46 65" stroke="var(--foreground)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M54 65 Q58 60 62 65" stroke="var(--foreground)" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        )}
        {expression.eyes === "o" && (
          <>
            <circle cx="42" cy="63" r="4" fill="var(--foreground)" />
            <circle cx="58" cy="63" r="4" fill="var(--foreground)" />
          </>
        )}
        {expression.eyes === "*" && (
          <>
            <text x="38" y="68" fontSize="14" fill="var(--foreground)">*</text>
            <text x="54" y="68" fontSize="14" fill="var(--foreground)">*</text>
          </>
        )}
        
        {/* Mouth */}
        {expression.mouth === "smile" && (
          <path d="M40 78 Q50 88 60 78" stroke="var(--foreground)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {expression.mouth === "big-smile" && (
          <path d="M38 76 Q50 92 62 76" stroke="var(--foreground)" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        {expression.mouth === "hmm" && (
          <ellipse cx="50" cy="80" rx="6" ry="4" fill="var(--foreground)" />
        )}
        
        {/* Blush */}
        <circle cx="32" cy="72" r="5" fill="var(--velio-mint)" opacity="0.5" />
        <circle cx="68" cy="72" r="5" fill="var(--velio-mint)" opacity="0.5" />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="velioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--velio-light-blue)" />
            <stop offset="50%" stopColor="var(--velio-mint)" />
            <stop offset="100%" stopColor="var(--velio-light-blue)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Sparkle effects for celebrating mood */}
      {mood === "celebrating" && (
        <>
          <div className="absolute -top-1 -right-1 w-3 h-3 animate-ping">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="var(--velio-gold)" />
            </svg>
          </div>
          <div className="absolute -top-2 left-0 w-2 h-2 animate-pulse">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="var(--velio-gold)" />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}
