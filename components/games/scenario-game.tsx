"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { VelioMascot } from "@/components/velio-mascot"

interface ScenarioGameProps {
  onBack: () => void
  onCorrect: () => void
}

const scenarios = [
  {
    id: 1,
    situation: "Estas conduciendo y ves que el semaforo cambia a amarillo cuando estas a 30 metros de la interseccion.",
    question: "Que debes hacer?",
    options: [
      { id: "a", text: "Acelerar para pasar antes del rojo", correct: false },
      { id: "b", text: "Frenar de forma segura y detenerte", correct: true },
      { id: "c", text: "Tocar el claxon y seguir", correct: false },
      { id: "d", text: "Cambiar de carril rapidamente", correct: false },
    ],
    explanation: "La luz amarilla indica que debes prepararte para detenerte. Si puedes frenar de forma segura, debes hacerlo.",
  },
  {
    id: 2,
    situation: "Llegas a una rotonda donde ya hay vehiculos circulando.",
    question: "Quien tiene prioridad?",
    options: [
      { id: "a", text: "Tu, porque vienes por la derecha", correct: false },
      { id: "b", text: "El vehiculo mas grande", correct: false },
      { id: "c", text: "Los vehiculos dentro de la rotonda", correct: true },
      { id: "d", text: "El primero que llegue", correct: false },
    ],
    explanation: "Los vehiculos que ya circulan dentro de la rotonda siempre tienen prioridad. Debes ceder el paso antes de entrar.",
  },
  {
    id: 3,
    situation: "Escuchas una sirena de ambulancia mientras conduces por una calle de un solo carril.",
    question: "Cual es la accion correcta?",
    options: [
      { id: "a", text: "Seguir conduciendo normalmente", correct: false },
      { id: "b", text: "Acelerar para salir del camino", correct: false },
      { id: "c", text: "Orillarte a la derecha y detenerte", correct: true },
      { id: "d", text: "Detenerte donde estas inmediatamente", correct: false },
    ],
    explanation: "Debes orillarte a la derecha de forma segura y detenerte para permitir el paso del vehiculo de emergencia.",
  },
  {
    id: 4,
    situation: "Estas manejando con lluvia intensa y la visibilidad es muy reducida.",
    question: "Que luces debes usar?",
    options: [
      { id: "a", text: "Luces altas para ver mejor", correct: false },
      { id: "b", text: "Luces bajas y reducir velocidad", correct: true },
      { id: "c", text: "Solo las intermitentes", correct: false },
      { id: "d", text: "Apagar todas las luces", correct: false },
    ],
    explanation: "Con lluvia intensa usa luces bajas. Las altas reflejan en las gotas y reducen mas la visibilidad.",
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
      <div className="p-4 space-y-6 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="font-bold text-lg flex-1">Escenarios Completados</h2>
        </div>

        <Card className="border-2 border-[var(--velio-gold)]">
          <CardContent className="p-6 text-center space-y-4">
            <VelioMascot size="lg" mood="celebrating" className="mx-auto" />
            <div>
              <p className="text-2xl font-bold text-[var(--velio-gold)]">
                {correctAnswers} / {scenarios.length}
              </p>
              <p className="text-muted-foreground">Respuestas correctas</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              {scenarios.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full",
                    index < correctAnswers 
                      ? "bg-[var(--velio-success)]" 
                      : "bg-destructive"
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-[var(--velio-gold)]">
              +{correctAnswers * 50} XP ganados!
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleRestart}>
            Jugar de Nuevo
          </Button>
          <Button className="flex-1" onClick={onBack}>
            Volver al Menu
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="font-bold text-lg">Escenarios</h2>
          <p className="text-sm text-muted-foreground">
            Pregunta {currentScenario + 1} de {scenarios.length}
          </p>
        </div>
        <VelioMascot size="sm" mood={showResult && isCorrect ? "celebrating" : "thinking"} />
      </div>

      {/* Progress */}
      <Progress value={((currentScenario + 1) / scenarios.length) * 100} className="h-2" />

      {/* Scenario Card */}
      <Card className="bg-[var(--velio-light-blue)]/20">
        <CardContent className="p-4 space-y-3">
          {/* Scenario illustration */}
          <div className="w-full h-32 bg-gradient-to-b from-[var(--velio-blue)]/30 to-[var(--velio-mint)]/30 rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 200 100" className="w-3/4 h-3/4">
              {/* Road */}
              <rect x="0" y="60" width="200" height="40" fill="#4a4a4a" />
              <line x1="100" y1="60" x2="100" y2="100" stroke="#fbbf24" strokeWidth="3" strokeDasharray="10,5" />
              {/* Car */}
              <rect x="60" y="70" width="40" height="20" rx="5" fill="var(--velio-blue)" />
              <rect x="65" y="65" width="15" height="8" rx="2" fill="#87CEEB" />
              <rect x="80" y="65" width="15" height="8" rx="2" fill="#87CEEB" />
              <circle cx="70" cy="92" r="5" fill="#333" />
              <circle cx="90" cy="92" r="5" fill="#333" />
              {/* Traffic light */}
              <rect x="150" y="30" width="15" height="35" rx="2" fill="#333" />
              <circle cx="157.5" cy="40" r="4" fill="#ef4444" />
              <circle cx="157.5" cy="52" r="4" fill="#fbbf24" />
            </svg>
          </div>
          
          <p className="text-sm leading-relaxed">{scenario.situation}</p>
          <p className="font-semibold text-foreground">{scenario.question}</p>
        </CardContent>
      </Card>

      {/* Options */}
      <Card>
        <CardContent className="p-3 space-y-2">
          {scenario.options.map((option) => {
            const isSelected = selectedAnswer === option.id
            const showCorrect = showResult && option.correct
            const showWrong = showResult && isSelected && !option.correct

            return (
              <Button
                key={option.id}
                variant="outline"
                className={cn(
                  "w-full h-auto p-3 justify-start text-left whitespace-normal",
                  isSelected && !showResult && "border-primary bg-primary/10",
                  showCorrect && "border-[var(--velio-success)] bg-[var(--velio-success)]/10 text-[var(--velio-success)]",
                  showWrong && "border-destructive bg-destructive/10 text-destructive"
                )}
                onClick={() => handleSelectAnswer(option.id)}
                disabled={showResult}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0",
                    isSelected && !showResult && "border-primary bg-primary text-primary-foreground",
                    showCorrect && "border-[var(--velio-success)] bg-[var(--velio-success)] text-white",
                    showWrong && "border-destructive bg-destructive text-white",
                    !isSelected && !showResult && "border-muted-foreground"
                  )}>
                    {option.id.toUpperCase()}
                  </span>
                  <span className="flex-1 text-sm">{option.text}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-[var(--velio-success)]" />}
                  {showWrong && <XCircle className="w-5 h-5 text-destructive" />}
                </div>
              </Button>
            )
          })}
        </CardContent>
      </Card>

      {/* Explanation */}
      {showResult && (
        <Card className={cn(
          "border-2",
          isCorrect 
            ? "border-[var(--velio-success)] bg-[var(--velio-success)]/10" 
            : "border-[var(--velio-gold)] bg-[var(--velio-gold)]/10"
        )}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <VelioMascot size="sm" mood={isCorrect ? "celebrating" : "encouraging"} />
              <div>
                <p className="font-semibold mb-1">
                  {isCorrect ? "Correcto!" : "No exactamente..."}
                </p>
                <p className="text-sm text-muted-foreground">{scenario.explanation}</p>
                {isCorrect && (
                  <p className="text-sm text-[var(--velio-gold)] font-medium mt-2">
                    +50 XP!
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
            className="flex-1" 
            onClick={handleSubmit}
            disabled={!selectedAnswer}
          >
            Confirmar Respuesta
          </Button>
        ) : (
          <Button className="flex-1" onClick={handleNext}>
            {currentScenario < scenarios.length - 1 ? "Siguiente Escenario" : "Ver Resultados"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
