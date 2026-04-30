"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { VelioMascot } from "@/components/velio-mascot"

interface DragDropGameProps {
  onBack: () => void
  onCorrect: () => void
}

const signals = [
  { id: "alto", name: "ALTO", color: "#dc2626", shape: "octagon" },
  { id: "ceda", name: "CEDA", color: "#dc2626", shape: "triangle" },
  { id: "info", name: "INFO", color: "#3b82f6", shape: "rectangle" },
  { id: "preventiva", name: "CURVA", color: "#f59e0b", shape: "diamond" },
]

const meanings = [
  { id: "alto", text: "Detente completamente" },
  { id: "ceda", text: "Deja pasar a otros" },
  { id: "info", text: "Información de servicios" },
  { id: "preventiva", text: "Precaución adelante" },
]

export function DragDropGame({ onBack, onCorrect }: DragDropGameProps) {
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [currentRound, setCurrentRound] = useState(1)
  const totalRounds = 3

  const shuffledMeanings = [...meanings].sort(() => Math.random() - 0.5)

  const handleDragStart = (signalId: string) => {
    setDraggedItem(signalId)
  }

  const handleDrop = (meaningId: string) => {
    if (draggedItem) {
      setMatches(prev => ({ ...prev, [meaningId]: draggedItem }))
      setDraggedItem(null)
    }
  }

  const handleTouchDrop = (meaningId: string) => {
    if (draggedItem) {
      setMatches(prev => ({ ...prev, [meaningId]: draggedItem }))
      setDraggedItem(null)
    }
  }

  const checkAnswers = () => {
    let correct = 0
    Object.entries(matches).forEach(([meaningId, signalId]) => {
      if (meaningId === signalId) correct++
    })
    setScore(correct)
    setShowResult(true)
    
    if (correct === signals.length) {
      onCorrect()
    }
  }

  const resetGame = () => {
    setMatches({})
    setShowResult(false)
    setScore(0)
    if (currentRound < totalRounds) {
      setCurrentRound(prev => prev + 1)
    }
  }

  const isMatched = (signalId: string) => Object.values(matches).includes(signalId)

  const getSignalShape = (signal: typeof signals[0]) => {
    switch (signal.shape) {
      case "octagon":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" 
              fill={signal.color}
              stroke="white"
              strokeWidth="4"
            />
            <text x="50" y="58" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
              {signal.name}
            </text>
          </svg>
        )
      case "triangle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,90 10,20 90,20" 
              fill="white"
              stroke={signal.color}
              strokeWidth="6"
            />
            <text x="50" y="55" textAnchor="middle" fill={signal.color} fontSize="14" fontWeight="bold">
              {signal.name}
            </text>
          </svg>
        )
      case "rectangle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="10" y="25" width="80" height="50" rx="6" fill={signal.color} stroke="white" strokeWidth="4" />
            <text x="50" y="58" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              {signal.name}
            </text>
          </svg>
        )
      case "diamond":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,10 90,50 50,90 10,50" 
              fill={signal.color}
              stroke="black"
              strokeWidth="2"
            />
            <text x="50" y="55" textAnchor="middle" fill="black" fontSize="12" fontWeight="bold">
              {signal.name}
            </text>
          </svg>
        )
    }
  }

  return (
    <div className="px-4 py-6 space-y-5 max-w-lg mx-auto lg:max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-xl" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="font-bold text-lg text-foreground">Arrastra y Suelta</h2>
          <p className="text-sm text-muted-foreground">Ronda {currentRound} de {totalRounds}</p>
        </div>
        <VelioMascot size="sm" mood={showResult && score === signals.length ? "celebrating" : "encouraging"} />
      </div>

      {/* Progress */}
      <Progress value={(currentRound / totalRounds) * 100} className="h-2" />

      {/* Instructions */}
      <Card className="border-0 shadow-soft bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-4">
          <p className="text-sm text-center text-foreground">
            Arrastra cada señal a su significado correcto
          </p>
        </CardContent>
      </Card>

      {/* Signals to drag */}
      <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
        <CardContent className="p-5">
          <p className="text-sm font-semibold text-foreground mb-4">Señales</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {signals.map((signal) => (
              <div
                key={signal.id}
                draggable={!isMatched(signal.id) && !showResult}
                onDragStart={() => handleDragStart(signal.id)}
                onClick={() => !showResult && !isMatched(signal.id) && setDraggedItem(draggedItem === signal.id ? null : signal.id)}
                className={cn(
                  "w-16 h-16 cursor-grab active:cursor-grabbing transition-all duration-200",
                  isMatched(signal.id) && "opacity-30 cursor-not-allowed",
                  draggedItem === signal.id && "ring-2 ring-primary ring-offset-2 scale-110",
                  !isMatched(signal.id) && !showResult && "hover:scale-105"
                )}
              >
                {getSignalShape(signal)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drop zones */}
      <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
        <CardContent className="p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground mb-2">Significados</p>
          {shuffledMeanings.map((meaning) => {
            const matchedSignal = signals.find(s => s.id === matches[meaning.id])
            const isCorrect = matches[meaning.id] === meaning.id
            
            return (
              <div
                key={meaning.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => !showResult && handleDrop(meaning.id)}
                onClick={() => !showResult && draggedItem && handleTouchDrop(meaning.id)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all min-h-[64px]",
                  !matches[meaning.id] && !showResult && "border-border hover:border-primary/50 hover:bg-primary/5",
                  matches[meaning.id] && !showResult && "border-solid border-primary/50 bg-primary/5",
                  showResult && isCorrect && "border-solid border-velio-success bg-velio-success/10",
                  showResult && matches[meaning.id] && !isCorrect && "border-solid border-destructive bg-destructive/10"
                )}
              >
                {matchedSignal ? (
                  <div className="w-10 h-10">
                    {getSignalShape(matchedSignal)}
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">?</span>
                  </div>
                )}
                <span className="flex-1 text-sm text-foreground">{meaning.text}</span>
                {showResult && matches[meaning.id] && (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-velio-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Result */}
      {showResult && (
        <Card className={cn(
          "border-2 shadow-soft animate-slide-up",
          score === signals.length 
            ? "border-velio-success/30 bg-velio-success/5" 
            : "border-velio-gold/30 bg-velio-gold/5"
        )}>
          <CardContent className="p-5 text-center">
            <p className="text-lg font-bold text-foreground">
              {score === signals.length ? "¡Excelente!" : "¡Buen intento!"}
            </p>
            <p className="text-sm text-muted-foreground">
              Acertaste {score} de {signals.length} señales
            </p>
            {score === signals.length && (
              <p className="text-sm text-velio-gold font-semibold mt-2">
                +25 XP ganados
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!showResult ? (
          <Button 
            className="flex-1 h-12 rounded-2xl shadow-soft" 
            onClick={checkAnswers}
            disabled={Object.keys(matches).length !== signals.length}
          >
            Verificar Respuestas
          </Button>
        ) : (
          <>
            <Button variant="outline" className="flex-1 h-12 rounded-2xl" onClick={resetGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              {currentRound < totalRounds ? "Siguiente" : "Reiniciar"}
            </Button>
            <Button className="flex-1 h-12 rounded-2xl shadow-soft" onClick={onBack}>
              Volver
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
