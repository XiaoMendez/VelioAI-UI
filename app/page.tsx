"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { HomeScreen } from "@/components/screens/home-screen"
import { LearningScreen } from "@/components/screens/learning-screen"
import { ChatbotScreen } from "@/components/screens/chatbot-screen"
import { SignalScreen } from "@/components/screens/signal-screen"
import { QuizScreen } from "@/components/screens/quiz-screen"

export type ScreenType = "home" | "learning" | "chatbot" | "signals" | "quiz"

export default function VelioApp() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>("home")

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen onNavigate={setActiveScreen} />
      case "learning":
        return <LearningScreen />
      case "chatbot":
        return <ChatbotScreen />
      case "signals":
        return <SignalScreen />
      case "quiz":
        return <QuizScreen />
      default:
        return <HomeScreen onNavigate={setActiveScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20 overflow-y-auto">
        {renderScreen()}
      </main>
      <BottomNavigation activeScreen={activeScreen} onNavigate={setActiveScreen} />
    </div>
  )
}
