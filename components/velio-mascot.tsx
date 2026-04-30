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
        viewBox="0 0 1440 810" 
        className="w-full h-full drop-shadow-lg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="velioClip">
            <path d="M 248.5625 144.621094 C 248.5625 122.550781 266.492188 104.621094 288.5625 104.621094 L 1150.78125 104.621094 C 1172.847656 104.621094 1190.78125 122.550781 1190.78125 144.621094 L 1190.78125 652.59375 C 1190.78125 674.660156 1172.847656 692.59375 1150.78125 692.59375 L 288.5625 692.59375 C 266.492188 692.59375 248.5625 674.660156 248.5625 652.59375 Z M 248.5625 144.621094" />
          </clipPath>
        </defs>
        
        {/* Background gradient */}
        <g clipPath="url(#velioClip)">
          <rect x="248" y="104" width="943" height="589" fill="url(#velioBodyGradient)" />
        </g>
        
        <defs>
          <linearGradient id="velioBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
        
        {/* Main rounded rectangle body */}
        <path 
          fill="url(#velioBodyGradient)"
          d="M 248.5625 144.621094 C 248.5625 122.550781 266.492188 104.621094 288.5625 104.621094 L 1150.78125 104.621094 C 1172.847656 104.621094 1190.78125 122.550781 1190.78125 144.621094 L 1190.78125 652.59375 C 1190.78125 674.660156 1172.847656 692.59375 1150.78125 692.59375 L 288.5625 692.59375 C 266.492188 692.59375 248.5625 674.660156 248.5625 652.59375 Z M 248.5625 144.621094"
        />
        
        {/* White decorative elements */}
        <path 
          fill="#ffffff"
          d="M 1125.628906 104.621094 C 1161.617188 104.621094 1190.78125 133.785156 1190.78125 169.773438 L 1190.78125 349.558594 C 1190.78125 385.546875 1161.617188 414.710938 1125.628906 414.710938 C 1089.644531 414.710938 1060.476563 385.546875 1060.476563 349.558594 L 1060.476563 169.773438 C 1060.476563 133.785156 1089.644531 104.621094 1125.628906 104.621094 Z M 1125.628906 104.621094"
        />
        <path 
          fill="#ffffff"
          d="M 313.714844 104.621094 C 349.703125 104.621094 378.867188 133.785156 378.867188 169.773438 L 378.867188 349.558594 C 378.867188 385.546875 349.703125 414.710938 313.714844 414.710938 C 277.730469 414.710938 248.5625 385.546875 248.5625 349.558594 L 248.5625 169.773438 C 248.5625 133.785156 277.730469 104.621094 313.714844 104.621094 Z M 313.714844 104.621094"
        />
        
        {/* Eyes - white circles with gradient pupils */}
        <circle cx="490" cy="320" r="90" fill="#ffffff" />
        <circle cx="950" cy="320" r="90" fill="#ffffff" />
        
        {/* Pupils with gradient */}
        <defs>
          <linearGradient id="pupilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <circle cx="500" cy="310" r="45" fill="url(#pupilGradient)" />
        <circle cx="960" cy="310" r="45" fill="url(#pupilGradient)" />
        
        {/* Eye highlights */}
        <circle cx="480" cy="290" r="15" fill="#ffffff" opacity="0.9" />
        <circle cx="940" cy="290" r="15" fill="#ffffff" opacity="0.9" />
        
        {/* Smile */}
        <path 
          d="M 580 480 Q 720 580 860 480" 
          stroke="#ffffff" 
          strokeWidth="25" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Cheek blush */}
        <circle cx="380" cy="420" r="35" fill="#ffffff" opacity="0.3" />
        <circle cx="1060" cy="420" r="35" fill="#ffffff" opacity="0.3" />
        
        {/* Sparkles for celebrating mood */}
        {mood === "celebrating" && (
          <>
            <g className="animate-pulse">
              <path 
                d="M 200 150 L 210 170 L 230 170 L 215 185 L 220 205 L 200 190 L 180 205 L 185 185 L 170 170 L 190 170 Z" 
                fill="#F59E0B"
              />
            </g>
            <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
              <path 
                d="M 1230 200 L 1240 220 L 1260 220 L 1245 235 L 1250 255 L 1230 240 L 1210 255 L 1215 235 L 1200 220 L 1220 220 Z" 
                fill="#F59E0B"
              />
            </g>
          </>
        )}
      </svg>
    </div>
  )
}
