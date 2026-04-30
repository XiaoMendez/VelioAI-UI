"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  { id: "alto", name: "ALTO", color: "#ef4444", shape: "octagon" },
  { id: "ceda", name: "CEDA", color: "#eab308", shape: "triangle" },
  { id: "info", name: "INFO", color: "#3b82f6", shape: "rectangle" },
  { id: "preventiva", name: "CURVA", color: "#f59e0b", shape: "diamond" },
]

const meanings = [
  { id: "alto", text: "Detente completamente" },
  { id: "ceda", text: "Deja pasar a otros" },
  { id: "info", text: "Informacion de servicios" },
  { id: "preventiva", text: "Precaucion adelante" },
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
              strokeWidth="3"
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
              strokeWidth="5"
            />
            <text x="50" y="55" textAnchor="middle" fill={signal.color} fontSize="14" fontWeight="bold">
              {signal.name}
            </text>
          </svg>
        )
      case "rectangle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="10" y="25" width="80" height="50" rx="5" fill={signal.color} stroke="white" strokeWidth="3" />
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
              strokeWidth="3"
            />
            <text x="50" y="55" textAnchor="middle" fill="black" fontSize="12" fontWeight="bold">
              {signal.name}
            </text>
          </svg>
        )
    }
  }

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="font-bold text-lg">Arrastra y Suelta</h2>
          <p className="text-sm text-muted-foreground">Ronda {currentRound} de {totalRounds}</p>
        </div>
        <VelioMascot size="sm" mood={showResult && score === signals.length ? "celebrating" : "encouraging"} />
      </div>

      {/* Progress */}
      <Progress value={(currentRound / totalRounds) * 100} className="h-2" />

      {/* Instructions */}
      <Card className="bg-[var(--velio-light-blue)]/30">
        <CardContent className="p-3">
          <p className="text-sm text-center">
            Arrastra cada senal a su significado correcto
          </p>
        </CardContent>
      </Card>

      {/* Signals to drag */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Senales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 justify-center">
            {signals.map((signal) => (
              <div
                key={signal.id}
                draggable={!isMatched(signal.id) && !showResult}
                onDragStart={() => handleDragStart(signal.id)}
                onClick={() => !showResult && !isMatched(signal.id) && setDraggedItem(draggedItem === signal.id ? null : signal.id)}
                className={cn(
                  "w-16 h-16 cursor-grab active:cursor-grabbing transition-all",
                  isMatched(signal.id) && "opacity-30 cursor-not-allowed",
                  draggedItem === signal.id && "ring-2 ring-primary scale-110",
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
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Significados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
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
                  "flex items-center gap-3 p-3 rounded-xl border-2 border-dashed transition-all min-h-[60px]",
                  !matches[meaning.id] && !showResult && "border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5",
                  matches[meaning.id] && !showResult && "border-solid border-primary/50 bg-primary/5",
                  showResult && isCorrect && "border-solid border-[var(--velio-success)] bg-[var(--velio-success)]/10",
                  showResult && matches[meaning.id] && !isCorrect && "border-solid border-destructive bg-destructive/10"
                )}
              >
                {matchedSignal ? (
                  <div className="w-10 h-10">
                    {getSignalShape(matchedSignal)}
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">?</span>
                  </div>
                )}
                <span className="flex-1 text-sm">{meaning.text}</span>
                {showResult && matches[meaning.id] && (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[var(--velio-success)]" />
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
          "border-2",
          score === signals.length 
            ? "border-[var(--velio-success)] bg-[var(--velio-success)]/10" 
            : "border-[var(--velio-gold)] bg-[var(--velio-gold)]/10"
        )}>
          <CardContent className="p-4 text-center">
            <p className="text-lg font-bold">
              {score === signals.length ? "Excelente!" : "Buen intento!"}
            </p>
            <p className="text-sm text-muted-foreground">
              Acertaste {score} de {signals.length} senales
            </p>
            {score === signals.length && (
              <p className="text-sm text-[var(--velio-gold)] font-medium mt-2">
                +25 XP ganados!
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!showResult ? (
          <Button 
            className="flex-1" 
            onClick={checkAnswers}
            disabled={Object.keys(matches).length !== signals.length}
          >
            Verificar Respuestas
          </Button>
        ) : (
          <>
            <Button variant="outline" className="flex-1" onClick={resetGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              {currentRound < totalRounds ? "Siguiente Ronda" : "Reiniciar"}
            </Button>
            <Button className="flex-1" onClick={onBack}>
              Volver al Menu
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
