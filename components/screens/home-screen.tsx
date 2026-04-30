"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Target, 
  Lightbulb, 
  Flame, 
  Star, 
  ChevronRight,
  BookOpen,
  Shield,
  Car,
  AlertTriangle,
  Sparkles,
  TrendingUp
} from "lucide-react"
import type { ScreenType } from "@/app/page"
import { VelioMascot } from "@/components/velio-mascot"
import { cn } from "@/lib/utils"

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void
}

// Mock user data
const userData = {
  name: "Carlos",
  level: 5,
  xp: 2450,
  xpToNext: 3000,
  streak: 7,
  totalPoints: 12500,
  completedLessons: 23,
  totalLessons: 45,
}

const masteredTopics = [
  { id: 1, name: "Señales Informativas", icon: BookOpen, progress: 100 },
  { id: 2, name: "Prioridad de Paso", icon: Car, progress: 95 },
  { id: 3, name: "Cinturón de Seguridad", icon: Shield, progress: 90 },
]

const topicsToImprove = [
  { id: 1, name: "Señales Preventivas", icon: AlertTriangle, progress: 45 },
  { id: 2, name: "Conducción Defensiva", icon: Shield, progress: 60 },
  { id: 3, name: "Velocidad en Zonas", icon: Car, progress: 55 },
]

const recommendations = [
  {
    id: 1,
    title: "Practica señales de tránsito",
    description: "Refuerza tu conocimiento de señales preventivas",
    action: "quiz",
    icon: AlertTriangle,
    color: "primary",
  },
  {
    id: 2,
    title: "Reto diario disponible",
    description: "Completa el reto de hoy y gana 100 XP extra",
    action: "learning",
    icon: Flame,
    color: "accent",
  },
  {
    id: 3,
    title: "Pregúntale a Velio",
    description: "Resuelve tus dudas sobre conducción defensiva",
    action: "chatbot",
    icon: Lightbulb,
    color: "primary",
  },
]

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const progressPercent = (userData.xp / userData.xpToNext) * 100
  const lessonsPercent = (userData.completedLessons / userData.totalLessons) * 100

  return (
    <div className="px-4 py-6 space-y-6 max-w-lg mx-auto lg:max-w-6xl">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-accent/90 p-6 text-primary-foreground shadow-soft-lg">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white blur-2xl" />
        </div>
        
        <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-primary-foreground/80 text-sm font-medium">
              Bienvenido de vuelta
            </p>
            <h1 className="text-2xl font-bold">
              ¡Hola! Soy Velio, tu asistente virtual
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              Sigamos aprendiendo juntos
            </p>
          </div>
          <VelioMascot size="lg" mood="happy" />
        </div>
        
        {/* Quick stats */}
        <div className="relative mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4" />
              <span className="text-lg font-bold">Nv.{userData.level}</span>
            </div>
            <p className="text-[11px] text-primary-foreground/70">Estudiante</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-lg font-bold">{userData.streak}</span>
            </div>
            <p className="text-[11px] text-primary-foreground/70">Días racha</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-lg font-bold">{(userData.totalPoints / 1000).toFixed(1)}K</span>
            </div>
            <p className="text-[11px] text-primary-foreground/70">Puntos</p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Tu Progreso</h3>
                  <p className="text-xs text-muted-foreground">Esta semana</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-velio-success text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                +12%
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Experiencia</span>
                  <span className="font-medium text-foreground">{userData.xp} / {userData.xpToNext} XP</span>
                </div>
                <div className="relative">
                  <Progress value={progressPercent} className="h-2.5" />
                  <div 
                    className="absolute top-0 h-2.5 bg-primary/20 rounded-full animate-pulse"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Lecciones</span>
                  <span className="font-medium text-foreground">{userData.completedLessons} / {userData.totalLessons}</span>
                </div>
                <Progress value={lessonsPercent} className="h-2.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="h-auto py-5 rounded-2xl flex-col gap-2 bg-primary hover:bg-primary/90 shadow-soft" 
              onClick={() => onNavigate("learning")}
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-semibold">Reto Diario</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-5 rounded-2xl flex-col gap-2 border-2 hover:bg-secondary/50 shadow-soft"
              onClick={() => onNavigate("quiz")}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">Practicar Quiz</span>
            </Button>
          </div>
          
          {/* Velio CTA */}
          <Button 
            variant="outline" 
            className="h-auto py-4 rounded-2xl border-2 hover:bg-secondary/50 shadow-soft flex items-center justify-between gap-4 px-5"
            onClick={() => onNavigate("chatbot")}
          >
            <div className="flex items-center gap-3">
              <VelioMascot size="sm" mood="happy" />
              <div className="text-left">
                <p className="font-semibold">Pregúntale a Velio</p>
                <p className="text-xs text-muted-foreground">Tu asistente de manejo</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Mastered Topics */}
        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-velio-gold/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-velio-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Temas Dominados</h3>
                <p className="text-xs text-muted-foreground">Excelente trabajo</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {masteredTopics.map((topic, index) => {
                const Icon = topic.icon
                return (
                  <div 
                    key={topic.id} 
                    className="flex items-center gap-3 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-velio-success/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-velio-success" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{topic.name}</p>
                      <Progress value={topic.progress} className="h-1.5 mt-1" />
                    </div>
                    <span className="text-sm font-semibold text-velio-success">
                      {topic.progress}%
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Topics to Improve */}
        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Por Mejorar</h3>
                <p className="text-xs text-muted-foreground">Enfócate en estos temas</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {topicsToImprove.map((topic, index) => {
                const Icon = topic.icon
                return (
                  <div 
                    key={topic.id} 
                    className="flex items-center gap-3 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{topic.name}</p>
                      <Progress value={topic.progress} className="h-1.5 mt-1" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {topic.progress}%
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations - Full width on desktop */}
        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm lg:col-span-2">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-velio-gold/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-velio-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Recomendado para Ti</h3>
                <p className="text-xs text-muted-foreground">Sugerencias personalizadas</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recommendations.map((rec, index) => {
                const Icon = rec.icon
                return (
                  <button
                    key={rec.id}
                    className={cn(
                      "w-full p-4 rounded-2xl flex flex-col sm:items-center gap-3 text-left sm:text-center transition-all duration-200",
                      "hover:bg-secondary/50 active:scale-[0.98] bg-secondary/30",
                      "animate-slide-up"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => onNavigate(rec.action as ScreenType)}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      rec.color === "accent" ? "bg-accent/10" : "bg-primary/10"
                    )}>
                      <Icon className={cn(
                        "w-6 h-6",
                        rec.color === "accent" ? "text-accent" : "text-primary"
                      )} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{rec.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
