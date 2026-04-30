"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  AlertTriangle
} from "lucide-react"
import type { ScreenType } from "@/app/page"
import { VelioMascot } from "@/components/velio-mascot"

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
  { id: 1, name: "Senales Informativas", icon: BookOpen, progress: 100 },
  { id: 2, name: "Prioridad de Paso", icon: Car, progress: 95 },
  { id: 3, name: "Cinturon de Seguridad", icon: Shield, progress: 90 },
]

const topicsToImprove = [
  { id: 1, name: "Senales Preventivas", icon: AlertTriangle, progress: 45 },
  { id: 2, name: "Conduccion Defensiva", icon: Shield, progress: 60 },
  { id: 3, name: "Velocidad en Zonas", icon: Car, progress: 55 },
]

const recommendations = [
  {
    id: 1,
    title: "Practica senales de transito",
    description: "Refuerza tu conocimiento de senales preventivas",
    action: "quiz",
    icon: AlertTriangle,
  },
  {
    id: 2,
    title: "Reto diario disponible",
    description: "Completa el reto de hoy y gana 100 XP extra",
    action: "learning",
    icon: Flame,
  },
  {
    id: 3,
    title: "Preguntale a Velio",
    description: "Resuelve tus dudas sobre conduccion defensiva",
    action: "chatbot",
    icon: Lightbulb,
  },
]

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const progressPercent = (userData.xp / userData.xpToNext) * 100
  const lessonsPercent = (userData.completedLessons / userData.totalLessons) * 100

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto">
      {/* Header with greeting and mascot */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Hola, {userData.name}!
          </h1>
          <p className="text-muted-foreground">
            Sigamos aprendiendo juntos
          </p>
        </div>
        <VelioMascot size="md" mood="happy" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-primary/20 flex items-center justify-center">
              <Star className="w-4 h-4 text-primary" />
            </div>
            <p className="text-lg font-bold text-primary">Nivel {userData.level}</p>
            <p className="text-xs text-muted-foreground">Estudiante</p>
          </CardContent>
        </Card>

        <Card className="bg-accent/30 border-accent/40">
          <CardContent className="p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-accent/40 flex items-center justify-center">
              <Flame className="w-4 h-4 text-accent-foreground" />
            </div>
            <p className="text-lg font-bold text-accent-foreground">{userData.streak} dias</p>
            <p className="text-xs text-muted-foreground">Racha</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-secondary/60">
          <CardContent className="p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-secondary/60 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-secondary-foreground" />
            </div>
            <p className="text-lg font-bold text-secondary-foreground">{(userData.totalPoints / 1000).toFixed(1)}K</p>
            <p className="text-xs text-muted-foreground">Puntos</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Tu Progreso General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Experiencia</span>
              <span className="font-medium">{userData.xp} / {userData.xpToNext} XP</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Lecciones Completadas</span>
              <span className="font-medium">{userData.completedLessons} / {userData.totalLessons}</span>
            </div>
            <Progress value={lessonsPercent} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Mastered Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[var(--velio-gold)]" />
            Temas Dominados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {masteredTopics.map((topic) => {
            const Icon = topic.icon
            return (
              <div key={topic.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--velio-success)]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--velio-success)]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{topic.name}</p>
                  <Progress value={topic.progress} className="h-2 mt-1" />
                </div>
                <span className="text-sm font-semibold text-[var(--velio-success)]">
                  {topic.progress}%
                </span>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Topics to Improve */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--velio-blue)]" />
            Temas por Mejorar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topicsToImprove.map((topic) => {
            const Icon = topic.icon
            return (
              <div key={topic.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--velio-blue)]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--velio-blue)]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{topic.name}</p>
                  <Progress value={topic.progress} className="h-2 mt-1" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  {topic.progress}%
                </span>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[var(--velio-gold)]" />
            Recomendaciones para Ti
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.map((rec) => {
            const Icon = rec.icon
            return (
              <Button
                key={rec.id}
                variant="ghost"
                className="w-full h-auto p-3 flex items-center gap-3 justify-start hover:bg-muted/50"
                onClick={() => onNavigate(rec.action as ScreenType)}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{rec.title}</p>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Button>
            )
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          className="h-auto py-4 flex-col gap-2" 
          onClick={() => onNavigate("learning")}
        >
          <Flame className="w-6 h-6" />
          <span>Reto Diario</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
          onClick={() => onNavigate("quiz")}
        >
          <BookOpen className="w-6 h-6" />
          <span>Practicar Quiz</span>
        </Button>
      </div>
    </div>
  )
}
