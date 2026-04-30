"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Flame, 
  Lock, 
  Unlock, 
  Star, 
  Trophy,
  Gift,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { VelioMascot } from "@/components/velio-mascot"
import { DragDropGame } from "@/components/games/drag-drop-game"
import { ScenarioGame } from "@/components/games/scenario-game"

// Mock data
const dailyChallenge = {
  title: "Reto del Dia: Senales",
  description: "Completa 5 ejercicios de senales de transito",
  progress: 3,
  total: 5,
  reward: 100,
  timeLeft: "4h 23m",
}

const levels = [
  { id: 1, name: "Principiante", unlocked: true, completed: true, stars: 3 },
  { id: 2, name: "Basico", unlocked: true, completed: true, stars: 2 },
  { id: 3, name: "Intermedio", unlocked: true, completed: false, stars: 0 },
  { id: 4, name: "Avanzado", unlocked: false, completed: false, stars: 0 },
  { id: 5, name: "Experto", unlocked: false, completed: false, stars: 0 },
]

const rewards = [
  { id: 1, name: "Insignia Novato", claimed: true, icon: Trophy },
  { id: 2, name: "100 XP Bonus", claimed: true, icon: Zap },
  { id: 3, name: "Racha de 7 dias", claimed: false, icon: Flame },
  { id: 4, name: "Maestro Senales", claimed: false, icon: Star },
]

type GameMode = "menu" | "dragdrop" | "scenario"

export function LearningScreen() {
  const [gameMode, setGameMode] = useState<GameMode>("menu")
  const [points, setPoints] = useState(250)
  const [showReward, setShowReward] = useState(false)

  const handleCorrectAnswer = (earnedPoints: number) => {
    setPoints(prev => prev + earnedPoints)
    setShowReward(true)
    setTimeout(() => setShowReward(false), 2000)
  }

  if (gameMode === "dragdrop") {
    return (
      <DragDropGame 
        onBack={() => setGameMode("menu")} 
        onCorrect={() => handleCorrectAnswer(25)}
      />
    )
  }

  if (gameMode === "scenario") {
    return (
      <ScenarioGame 
        onBack={() => setGameMode("menu")} 
        onCorrect={() => handleCorrectAnswer(50)}
      />
    )
  }

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto">
      {/* Points Display */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Aprende Jugando</h1>
          <p className="text-muted-foreground">Gana puntos y desbloquea niveles</p>
        </div>
        <div className="flex items-center gap-2 bg-[var(--velio-gold)]/20 px-3 py-2 rounded-full">
          <Star className="w-5 h-5 text-[var(--velio-gold)]" />
          <span className="font-bold text-[var(--velio-gold)]">{points}</span>
        </div>
      </div>

      {/* Point Reward Animation */}
      {showReward && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-[var(--velio-gold)] text-white px-6 py-3 rounded-full animate-bounce shadow-lg">
            <span className="font-bold text-lg">+25 XP!</span>
          </div>
        </div>
      )}

      {/* Daily Challenge */}
      <Card className="bg-gradient-to-r from-[var(--velio-blue)]/20 to-[var(--velio-mint)]/20 border-[var(--velio-blue)]/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[var(--velio-gold)]/20 flex items-center justify-center">
              <Flame className="w-7 h-7 text-[var(--velio-gold)]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-foreground">{dailyChallenge.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {dailyChallenge.timeLeft}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{dailyChallenge.description}</p>
              <div className="flex items-center gap-3">
                <Progress 
                  value={(dailyChallenge.progress / dailyChallenge.total) * 100} 
                  className="flex-1 h-2" 
                />
                <span className="text-sm font-medium">
                  {dailyChallenge.progress}/{dailyChallenge.total}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-[var(--velio-gold)]">
                <Gift className="w-4 h-4" />
                <span>Recompensa: {dailyChallenge.reward} XP</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Modes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Modos de Juego</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-auto p-4 flex items-center gap-4 justify-start hover:bg-[var(--velio-blue)]/10 hover:border-[var(--velio-blue)]"
            onClick={() => setGameMode("dragdrop")}
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--velio-blue)]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--velio-blue)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <path d="M14 6h3m3 0h-3m0 0V3m0 3v3" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">Arrastra y Suelta</p>
              <p className="text-sm text-muted-foreground">Relaciona senales con sus significados</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Button>

          <Button
            variant="outline"
            className="w-full h-auto p-4 flex items-center gap-4 justify-start hover:bg-[var(--velio-mint)]/10 hover:border-[var(--velio-mint)]"
            onClick={() => setGameMode("scenario")}
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--velio-mint)]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--velio-mint)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">Escenarios</p>
              <p className="text-sm text-muted-foreground">Responde a situaciones de manejo</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Button>
        </CardContent>
      </Card>

      {/* Levels */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[var(--velio-gold)]" />
            Niveles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {levels.map((level) => (
              <div
                key={level.id}
                className={cn(
                  "flex-shrink-0 w-20 h-24 rounded-xl flex flex-col items-center justify-center gap-1 border-2 transition-all",
                  level.unlocked
                    ? level.completed
                      ? "bg-[var(--velio-success)]/10 border-[var(--velio-success)]"
                      : "bg-[var(--velio-blue)]/10 border-[var(--velio-blue)] cursor-pointer hover:scale-105"
                    : "bg-muted/50 border-muted cursor-not-allowed opacity-60"
                )}
              >
                {level.unlocked ? (
                  level.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-[var(--velio-success)]" />
                  ) : (
                    <Unlock className="w-6 h-6 text-[var(--velio-blue)]" />
                  )
                ) : (
                  <Lock className="w-6 h-6 text-muted-foreground" />
                )}
                <span className="text-xs font-medium text-center px-1">{level.name}</span>
                {level.completed && (
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-3 h-3",
                          star <= level.stars ? "text-[var(--velio-gold)] fill-[var(--velio-gold)]" : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Gift className="w-5 h-5 text-[var(--velio-mint)]" />
            Recompensas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {rewards.map((reward) => {
              const Icon = reward.icon
              return (
                <div
                  key={reward.id}
                  className={cn(
                    "p-3 rounded-xl border flex flex-col items-center gap-2 transition-all",
                    reward.claimed
                      ? "bg-[var(--velio-gold)]/10 border-[var(--velio-gold)]/30"
                      : "bg-muted/30 border-muted"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    reward.claimed ? "bg-[var(--velio-gold)]/20" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      reward.claimed ? "text-[var(--velio-gold)]" : "text-muted-foreground"
                    )} />
                  </div>
                  <span className={cn(
                    "text-xs font-medium text-center",
                    reward.claimed ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {reward.name}
                  </span>
                  {reward.claimed && (
                    <CheckCircle2 className="w-4 h-4 text-[var(--velio-success)]" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Velio Encouragement */}
      <Card className="bg-[var(--velio-light-blue)]/30">
        <CardContent className="p-4 flex items-center gap-4">
          <VelioMascot size="md" mood="encouraging" />
          <div>
            <p className="font-medium text-foreground">Vas muy bien!</p>
            <p className="text-sm text-muted-foreground">
              Completa el reto diario para ganar tu recompensa
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
