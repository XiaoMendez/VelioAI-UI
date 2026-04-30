"use client"

import { Home, Gamepad2, MessageCircle, Camera, ClipboardList } from "lucide-react"
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
  { id: "signals", icon: Camera, label: "Senales" },
  { id: "quiz", icon: ClipboardList, label: "Quiz" },
]

export function BottomNavigation({ activeScreen, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeScreen === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
