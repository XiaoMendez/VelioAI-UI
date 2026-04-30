"use client"

import { cn } from "@/lib/utils"

interface VelioMascotProps {
  size?: "sm" | "md" | "lg" | "xl"
  mood?: "happy" | "thinking" | "encouraging" | "celebrating"
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
  xl: "w-28 h-28",
}

export function VelioMascot({ 
  size = "md", 
  mood = "happy", 
  className,
  animated = true 
}: VelioMascotProps) {
  
  const getExpression = () => {
    switch (mood) {
      case "happy":
        return { eyeType: "happy", mouthType: "smile" }
      case "thinking":
        return { eyeType: "curious", mouthType: "neutral" }
      case "encouraging":
        return { eyeType: "wink", mouthType: "smile" }
      case "celebrating":
        return { eyeType: "happy", mouthType: "open" }
      default:
        return { eyeType: "happy", mouthType: "smile" }
    }
  }

  const expression = getExpression()

  return (
    <div 
      className={cn(
        "relative flex-shrink-0",
        sizeClasses[size], 
        animated && mood === "celebrating" && "animate-float",
        className
      )}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Definitions */}
        <defs>
          {/* Main gradient - soft blue to teal */}
          <linearGradient id="velioBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
          
          {/* Highlight gradient */}
          <linearGradient id="velioHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          
          {/* Shadow */}
          <filter id="velioShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="var(--primary)" floodOpacity="0.2"/>
          </filter>
        </defs>
        
        {/* Main body - rounded square with smooth corners */}
        <rect 
          x="12" y="12" 
          width="76" height="76" 
          rx="28" ry="28"
          fill="url(#velioBody)"
          filter="url(#velioShadow)"
        />
        
        {/* Inner highlight */}
        <rect 
          x="16" y="16" 
          width="68" height="40" 
          rx="24" ry="24"
          fill="url(#velioHighlight)"
        />
        
        {/* Face container */}
        <g>
          {/* Eyes */}
          {expression.eyeType === "happy" && (
            <>
              {/* Left eye - happy arc */}
              <path 
                d="M32 42 Q37 35 42 42" 
                stroke="white" 
                strokeWidth="3.5" 
                fill="none" 
                strokeLinecap="round"
              />
              {/* Right eye - happy arc */}
              <path 
                d="M58 42 Q63 35 68 42" 
                stroke="white" 
                strokeWidth="3.5" 
                fill="none" 
                strokeLinecap="round"
              />
            </>
          )}
          
          {expression.eyeType === "curious" && (
            <>
              {/* Left eye - round */}
              <circle cx="37" cy="40" r="6" fill="white" />
              <circle cx="38" cy="39" r="2.5" fill="var(--primary)" />
              {/* Right eye - round */}
              <circle cx="63" cy="40" r="6" fill="white" />
              <circle cx="64" cy="39" r="2.5" fill="var(--primary)" />
            </>
          )}
          
          {expression.eyeType === "wink" && (
            <>
              {/* Left eye - wink */}
              <path 
                d="M32 42 Q37 35 42 42" 
                stroke="white" 
                strokeWidth="3.5" 
                fill="none" 
                strokeLinecap="round"
              />
              {/* Right eye - open */}
              <circle cx="63" cy="40" r="6" fill="white" />
              <circle cx="64" cy="39" r="2.5" fill="var(--primary)" />
            </>
          )}
          
          {/* Mouth */}
          {expression.mouthType === "smile" && (
            <path 
              d="M38 58 Q50 70 62 58" 
              stroke="white" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round"
            />
          )}
          
          {expression.mouthType === "open" && (
            <ellipse 
              cx="50" cy="62" 
              rx="10" ry="8" 
              fill="white"
            />
          )}
          
          {expression.mouthType === "neutral" && (
            <ellipse 
              cx="50" cy="60" 
              rx="6" ry="5" 
              fill="white"
            />
          )}
          
          {/* Cheek blush */}
          <circle cx="28" cy="52" r="6" fill="white" opacity="0.25" />
          <circle cx="72" cy="52" r="6" fill="white" opacity="0.25" />
        </g>
        
        {/* Sparkles for celebrating mood */}
        {mood === "celebrating" && (
          <>
            <g className="animate-pulse">
              <path 
                d="M15 20 L17 24 L21 24 L18 27 L19 31 L15 28 L11 31 L12 27 L9 24 L13 24 Z" 
                fill="var(--velio-gold)"
              />
            </g>
            <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
              <path 
                d="M85 25 L86 28 L89 28 L87 30 L88 33 L85 31 L82 33 L83 30 L81 28 L84 28 Z" 
                fill="var(--velio-gold)"
              />
            </g>
            <g className="animate-pulse" style={{ animationDelay: "0.6s" }}>
              <path 
                d="M80 70 L81 72 L83 72 L82 74 L82 76 L80 75 L78 76 L78 74 L77 72 L79 72 Z" 
                fill="var(--velio-gold)"
              />
            </g>
          </>
        )}
      </svg>
    </div>
  )
}
