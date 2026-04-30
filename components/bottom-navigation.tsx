"use client"

import { Home, Gamepad2, MessageCircle, Eye, ClipboardList } from "lucide-react"
import type { ScreenType } from "@/app/page"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  activeScreen: ScreenType
  onNavigate: (screen: ScreenType) => void
}

const navItems: { id: ScreenType; icon: React.ElementType; label: string }[] = [
  { id: "home", icon: Home, label: "Inicio" },
  { id: "learning", icon: Gamepad2, label: "Aprender" },
  { id: "chatbot", icon: MessageCircle, label: "Velio" },
  { id: "signals", icon: Eye, label: "Señales" },
  { id: "quiz", icon: ClipboardList, label: "Quiz" },
]

export function BottomNavigation({ activeScreen, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient blur backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/0 backdrop-blur-xl" />
      
      <div className="relative max-w-lg mx-auto lg:max-w-6xl px-2 pb-safe">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeScreen === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl transition-all duration-300",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-fade-in" />
                )}
                
                <div className="relative">
                  <Icon 
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isActive && "scale-110"
                    )} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {/* Glow effect */}
                  {isActive && (
                    <div className="absolute inset-0 blur-lg bg-primary/30 scale-150" />
                  )}
                </div>
                
                <span className={cn(
                  "relative text-[11px] font-medium transition-all duration-300",
                  isActive && "font-semibold"
                )}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
