"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { VelioMascot } from "@/components/velio-mascot"

interface ScenarioGameProps {
  onBack: () => void
  onCorrect: () => void
}

const scenarios = [
  {
    id: 1,
    situation: "Estás conduciendo y ves que el semáforo cambia a amarillo cuando estás a 30 metros de la intersección.",
    question: "¿Qué debes hacer?",
    options: [
      { id: "a", text: "Acelerar para pasar antes del rojo", correct: false },
      { id: "b", text: "Frenar de forma segura y detenerte", correct: true },
      { id: "c", text: "Tocar el claxon y seguir", correct: false },
      { id: "d", text: "Cambiar de carril rápidamente", correct: false },
    ],
    explanation: "La luz amarilla indica que debes prepararte para detenerte. Si puedes frenar de forma segura, debes hacerlo.",
  },
  {
    id: 2,
    situation: "Llegas a una rotonda donde ya hay vehículos circulando.",
    question: "¿Quién tiene prioridad?",
    options: [
      { id: "a", text: "Tú, porque vienes por la derecha", correct: false },
      { id: "b", text: "El vehículo más grande", correct: false },
      { id: "c", text: "Los vehículos dentro de la rotonda", correct: true },
      { id: "d", text: "El primero que llegue", correct: false },
    ],
    explanation: "Los vehículos que ya circulan dentro de la rotonda siempre tienen prioridad. Debes ceder el paso antes de entrar.",
  },
  {
    id: 3,
    situation: "Escuchas una sirena de ambulancia mientras conduces por una calle de un solo carril.",
    question: "¿Cuál es la acción correcta?",
    options: [
      { id: "a", text: "Seguir conduciendo normalmente", correct: false },
      { id: "b", text: "Acelerar para salir del camino", correct: false },
      { id: "c", text: "Orillarte a la derecha y detenerte", correct: true },
      { id: "d", text: "Detenerte donde estás inmediatamente", correct: false },
    ],
    explanation: "Debes orillarte a la derecha de forma segura y detenerte para permitir el paso del vehículo de emergencia.",
  },
  {
    id: 4,
    situation: "Estás manejando con lluvia intensa y la visibilidad es muy reducida.",
    question: "¿Qué luces debes usar?",
    options: [
      { id: "a", text: "Luces altas para ver mejor", correct: false },
      { id: "b", text: "Luces bajas y reducir velocidad", correct: true },
      { id: "c", text: "Solo las intermitentes", correct: false },
      { id: "d", text: "Apagar todas las luces", correct: false },
    ],
    explanation: "Con lluvia intensa usa luces bajas. Las altas reflejan en las gotas y reducen más la visibilidad.",
  },
]

export function ScenarioGame({ onBack, onCorrect }: ScenarioGameProps) {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const scenario = scenarios[currentScenario]
  const correctOption = scenario.options.find(o => o.correct)
  const isCorrect = selectedAnswer === correctOption?.id

  const handleSelectAnswer = (optionId: string) => {
    if (showResult) return
    setSelectedAnswer(optionId)
  }

  const handleSubmit = () => {
    setShowResult(true)
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1)
      onCorrect()
    }
  }

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentScenario(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setCorrectAnswers(0)
    setGameComplete(false)
  }

  if (gameComplete) {
    return (
      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto lg:max-w-3xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="font-bold text-lg text-foreground flex-1">Escenarios Completados</h2>
        </div>

        <Card className="border-2 border-velio-gold/30 shadow-soft-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-velio-gold/5 to-transparent" />
          <CardContent className="relative p-8 text-center space-y-5">
            <VelioMascot size="xl" mood="celebrating" className="mx-auto" />
            <div>
              <p className="text-4xl font-bold text-velio-gold">
                {correctAnswers} / {scenarios.length}
              </p>
              <p className="text-muted-foreground mt-1">Respuestas correctas</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              {scenarios.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-4 h-4 rounded-full transition-colors",
                    index < correctAnswers 
                      ? "bg-velio-success" 
                      : "bg-destructive"
                  )}
                />
              ))}
            </div>
            <p className="text-sm font-medium text-velio-gold">
              +{correctAnswers * 50} XP ganados
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12 rounded-2xl" onClick={handleRestart}>
            Jugar de Nuevo
          </Button>
          <Button className="flex-1 h-12 rounded-2xl shadow-soft" onClick={onBack}>
            Volver al Menú
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 space-y-5 max-w-lg mx-auto lg:max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="font-bold text-lg text-foreground">Escenarios</h2>
          <p className="text-sm text-muted-foreground">
            Pregunta {currentScenario + 1} de {scenarios.length}
          </p>
        </div>
        <VelioMascot size="sm" mood={showResult && isCorrect ? "celebrating" : "thinking"} />
      </div>

      {/* Progress */}
      <Progress value={((currentScenario + 1) / scenarios.length) * 100} className="h-2" />

      {/* Scenario Card */}
      <Card className="border-0 shadow-soft-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <CardContent className="relative p-5 space-y-4">
          {/* Scenario illustration */}
          <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
            <svg viewBox="0 0 200 100" className="w-3/4 h-3/4">
              {/* Road */}
              <rect x="0" y="60" width="200" height="40" fill="#4a4a4a" rx="2" />
              <line x1="100" y1="60" x2="100" y2="100" stroke="#fbbf24" strokeWidth="3" strokeDasharray="10,5" />
              {/* Car */}
              <rect x="55" y="68" width="45" height="22" rx="6" fill="var(--primary)" />
              <rect x="62" y="62" width="16" height="10" rx="3" fill="#87CEEB" />
              <rect x="82" y="62" width="16" height="10" rx="3" fill="#87CEEB" />
              <circle cx="68" cy="92" r="6" fill="#333" />
              <circle cx="92" cy="92" r="6" fill="#333" />
              {/* Traffic light */}
              <rect x="148" y="25" width="18" height="40" rx="4" fill="#333" />
              <circle cx="157" cy="38" r="5" fill="#ef4444" />
              <circle cx="157" cy="52" r="5" fill="#fbbf24" />
            </svg>
          </div>
          
          <p className="text-sm leading-relaxed text-foreground">{scenario.situation}</p>
          <p className="font-semibold text-foreground">{scenario.question}</p>
        </CardContent>
      </Card>

      {/* Options */}
      <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 space-y-3">
          {scenario.options.map((option) => {
            const isSelected = selectedAnswer === option.id
            const showCorrect = showResult && option.correct
            const showWrong = showResult && isSelected && !option.correct

            return (
              <button
                key={option.id}
                className={cn(
                  "w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all duration-200 border-2",
                  isSelected && !showResult && "border-primary bg-primary/5",
                  showCorrect && "border-velio-success bg-velio-success/5",
                  showWrong && "border-destructive bg-destructive/5",
                  !isSelected && !showResult && "border-border/50 hover:border-primary/50 hover:bg-secondary/30",
                  showResult && !showCorrect && !showWrong && "opacity-50"
                )}
                onClick={() => handleSelectAnswer(option.id)}
                disabled={showResult}
              >
                <span className={cn(
                  "w-8 h-8 rounded-xl border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors",
                  isSelected && !showResult && "border-primary bg-primary text-primary-foreground",
                  showCorrect && "border-velio-success bg-velio-success text-white",
                  showWrong && "border-destructive bg-destructive text-white",
                  !isSelected && !showResult && "border-border"
                )}>
                  {option.id.toUpperCase()}
                </span>
                <span className="flex-1 text-sm text-foreground">{option.text}</span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-velio-success" />}
                {showWrong && <XCircle className="w-5 h-5 text-destructive" />}
              </button>
            )
          })}
        </CardContent>
      </Card>

      {/* Explanation */}
      {showResult && (
        <Card className={cn(
          "border-2 shadow-soft animate-slide-up",
          isCorrect 
            ? "border-velio-success/30 bg-velio-success/5" 
            : "border-velio-warning/30 bg-velio-warning/5"
        )}>
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <VelioMascot size="sm" mood={isCorrect ? "celebrating" : "encouraging"} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {isCorrect && <Sparkles className="w-4 h-4 text-velio-gold" />}
                  <p className="font-semibold text-foreground">
                    {isCorrect ? "¡Correcto!" : "No exactamente..."}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{scenario.explanation}</p>
                {isCorrect && (
                  <p className="text-sm text-velio-gold font-semibold mt-2">
                    +50 XP
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!showResult ? (
          <Button 
            className="flex-1 h-12 rounded-2xl shadow-soft" 
            onClick={handleSubmit}
            disabled={!selectedAnswer}
          >
            Confirmar Respuesta
          </Button>
        ) : (
          <Button className="flex-1 h-12 rounded-2xl shadow-soft" onClick={handleNext}>
            {currentScenario < scenarios.length - 1 ? "Siguiente Escenario" : "Ver Resultados"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
