"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { HomeScreen } from "@/components/screens/home-screen"
import { LearningScreen } from "@/components/screens/learning-screen"
import { ChatbotScreen } from "@/components/screens/chatbot-screen"
import { SignalScreen } from "@/components/screens/signal-screen"
import { QuizScreen } from "@/components/screens/quiz-screen"
import { cn } from "@/lib/utils"

export type ScreenType = "home" | "learning" | "chatbot" | "signals" | "quiz"

export default function VelioApp() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("home")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleNavigate = (screen: ScreenType) => {
    if (screen === activeScreen) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveScreen(screen)
      setIsTransitioning(false)
    }, 150)
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />
      case "learning":
        return <LearningScreen />
      case "chatbot":
        return <ChatbotScreen />
      case "signals":
        return <SignalScreen />
      case "quiz":
        return <QuizScreen />
      default:
        return <HomeScreen onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main 
        className={cn(
          "flex-1 pb-24 overflow-y-auto transition-all duration-200",
          isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        {renderScreen()}
      </main>
      <BottomNavigation activeScreen={activeScreen} onNavigate={handleNavigate} />
    </div>
  )
}
