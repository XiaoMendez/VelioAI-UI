"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Flame, 
  Lock, 
  Star, 
  Trophy,
  Gift,
  Zap,
  CheckCircle2,
  ArrowRight,
  Play,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { VelioMascot } from "@/components/velio-mascot"
import { DragDropGame } from "@/components/games/drag-drop-game"
import { ScenarioGame } from "@/components/games/scenario-game"

// Mock data
const dailyChallenge = {
  title: "Reto del Día: Señales",
  description: "Completa 5 ejercicios de señales de tránsito",
  progress: 3,
  total: 5,
  reward: 100,
  timeLeft: "4h 23m",
}

const levels = [
  { id: 1, name: "Principiante", unlocked: true, completed: true, stars: 3 },
  { id: 2, name: "Básico", unlocked: true, completed: true, stars: 2 },
  { id: 3, name: "Intermedio", unlocked: true, completed: false, stars: 0 },
  { id: 4, name: "Avanzado", unlocked: false, completed: false, stars: 0 },
  { id: 5, name: "Experto", unlocked: false, completed: false, stars: 0 },
]

const rewards = [
  { id: 1, name: "Insignia Novato", claimed: true, icon: Trophy },
  { id: 2, name: "100 XP Bonus", claimed: true, icon: Zap },
  { id: 3, name: "Racha 7 días", claimed: false, icon: Flame },
  { id: 4, name: "Maestro Señales", claimed: false, icon: Star },
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
    <div className="px-4 py-6 space-y-6 max-w-lg mx-auto lg:max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <VelioMascot size="md" mood="happy" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Aprende Jugando</h1>
            <p className="text-muted-foreground text-sm">Gana puntos y desbloquea niveles</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-velio-gold/10 px-4 py-2 rounded-2xl self-start sm:self-auto">
          <Star className="w-5 h-5 text-velio-gold" />
          <span className="font-bold text-velio-gold">{points}</span>
        </div>
      </div>

      {/* Point Reward Animation */}
      {showReward && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-velio-gold text-white px-8 py-4 rounded-2xl animate-bounce shadow-soft-lg">
            <span className="font-bold text-xl">+25 XP!</span>
          </div>
        </div>
      )}

      {/* Main Grid Layout for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Challenge */}
        <Card className="overflow-hidden border-0 shadow-soft-lg lg:col-span-2 bg-gradient-to-br from-primary to-accent">
          <CardContent className="relative p-5 text-primary-foreground">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Flame className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                  <h3 className="font-bold">{dailyChallenge.title}</h3>
                  <Badge className="bg-white/20 text-white border-0 text-xs self-start sm:self-auto">
                    {dailyChallenge.timeLeft}
                  </Badge>
                </div>
                <p className="text-sm text-primary-foreground/80 mb-3">{dailyChallenge.description}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/20 rounded-full h-2.5">
                    <div 
                      className="bg-white h-full rounded-full transition-all duration-500"
                      style={{ width: `${(dailyChallenge.progress / dailyChallenge.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold">
                    {dailyChallenge.progress}/{dailyChallenge.total}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm">
                  <Gift className="w-4 h-4" />
                  <span>Recompensa: {dailyChallenge.reward} XP</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Modes */}
        <Card className="border border-border/40 shadow-soft bg-card rounded-3xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Play className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Modos de Juego</h3>
                <p className="text-xs text-muted-foreground">Elige cómo quieres aprender</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                className="w-full p-4 rounded-2xl flex items-center gap-4 text-left bg-secondary/50 hover:bg-secondary transition-all duration-200 active:scale-[0.98]"
                onClick={() => setGameMode("dragdrop")}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <path d="M14 6h3m3 0h-3m0 0V3m0 3v3" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Arrastra y Suelta</p>
                  <p className="text-sm text-muted-foreground">Relaciona señales con sus significados</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <button
                className="w-full p-4 rounded-2xl flex items-center gap-4 text-left bg-secondary/50 hover:bg-secondary transition-all duration-200 active:scale-[0.98]"
                onClick={() => setGameMode("scenario")}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Escenarios</p>
                  <p className="text-sm text-muted-foreground">Responde a situaciones de manejo</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Levels */}
        <Card className="border border-border/40 shadow-soft bg-card rounded-3xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-velio-gold/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-velio-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Niveles</h3>
                <p className="text-xs text-muted-foreground">Tu progreso de aprendizaje</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className={cn(
                    "flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all duration-200",
                    level.unlocked
                      ? level.completed
                        ? "bg-velio-success/10 border-velio-success"
                        : "bg-primary/5 border-primary cursor-pointer hover:scale-105 active:scale-100"
                      : "bg-muted/30 border-muted cursor-not-allowed opacity-50"
                  )}
                >
                  {level.unlocked ? (
                    level.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-velio-success" />
                    ) : (
                      <Play className="w-6 h-6 text-primary" />
                    )
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                  <span className="text-[10px] font-medium text-center px-1 text-foreground">{level.name}</span>
                  {level.completed && (
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-3 h-3",
                            star <= level.stars ? "text-velio-gold fill-velio-gold" : "text-muted"
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
        <Card className="border border-border/40 shadow-soft bg-card rounded-3xl lg:col-span-2">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Recompensas</h3>
                <p className="text-xs text-muted-foreground">Tus logros desbloqueados</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {rewards.map((reward) => {
                const Icon = reward.icon
                return (
                  <div
                    key={reward.id}
                    className={cn(
                      "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-200",
                      reward.claimed
                        ? "bg-velio-gold/5 border-velio-gold/30"
                        : "bg-muted/20 border-muted/50"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      reward.claimed ? "bg-velio-gold/10" : "bg-muted/30"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        reward.claimed ? "text-velio-gold" : "text-muted-foreground"
                      )} />
                    </div>
                    <span className={cn(
                      "text-xs font-medium text-center",
                      reward.claimed ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {reward.name}
                    </span>
                    {reward.claimed && (
                      <CheckCircle2 className="w-4 h-4 text-velio-success" />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Velio Encouragement */}
      <Card className="border border-border/40 shadow-soft bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl">
        <CardContent className="p-5 flex items-center gap-4">
          <VelioMascot size="md" mood="encouraging" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-velio-gold" />
              <p className="font-semibold text-foreground">¡Vas muy bien!</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Completa el reto diario para ganar tu recompensa
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
