"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Star, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  RotateCcw,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { VelioMascot } from "@/components/velio-mascot"

type QuizState = "menu" | "quiz" | "results"
type Category = "senales" | "prioridad" | "normas" | "velocidad" | "mixto"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: Category
}

const categories: { id: Category; name: string; icon: React.ElementType; questionCount: number }[] = [
  { id: "senales", name: "Senales de Transito", icon: BookOpen, questionCount: 15 },
  { id: "prioridad", name: "Prioridad de Paso", icon: Trophy, questionCount: 12 },
  { id: "normas", name: "Normas de Circulacion", icon: BookOpen, questionCount: 18 },
  { id: "velocidad", name: "Velocidad y Distancia", icon: Clock, questionCount: 10 },
  { id: "mixto", name: "Examen Mixto", icon: Zap, questionCount: 20 },
]

const allQuestions: Question[] = [
  {
    id: 1,
    question: "Que significa la senal de ALTO (octagono rojo)?",
    options: [
      "Reducir la velocidad",
      "Detenerse completamente antes de la linea",
      "Ceder el paso si hay trafico",
      "Continuar con precaucion"
    ],
    correctAnswer: 1,
    explanation: "La senal de ALTO significa que debes detener completamente el vehiculo antes de la linea de parada y solo continuar cuando el camino este libre.",
    category: "senales"
  },
  {
    id: 2,
    question: "Quien tiene prioridad en una rotonda?",
    options: [
      "El vehiculo que va a entrar",
      "El vehiculo mas grande",
      "Los vehiculos que ya circulan dentro",
      "El vehiculo que llega primero"
    ],
    correctAnswer: 2,
    explanation: "Los vehiculos que ya circulan dentro de la rotonda siempre tienen prioridad. Debes ceder el paso antes de entrar.",
    category: "prioridad"
  },
  {
    id: 3,
    question: "Cual es la velocidad maxima permitida en zonas escolares?",
    options: [
      "40 km/h",
      "30 km/h", 
      "25 km/h",
      "35 km/h"
    ],
    correctAnswer: 2,
    explanation: "En zonas escolares el limite es de 25 km/h, especialmente durante los horarios de entrada y salida de clases.",
    category: "velocidad"
  },
  {
    id: 4,
    question: "Que indica la luz amarilla del semaforo?",
    options: [
      "Acelerar para pasar",
      "Detenerse inmediatamente",
      "Prepararse para detenerse de forma segura",
      "Continuar sin cambios"
    ],
    correctAnswer: 2,
    explanation: "La luz amarilla es una advertencia de que la luz cambiara a rojo. Debes prepararte para detenerte de forma segura.",
    category: "normas"
  },
  {
    id: 5,
    question: "Cual es la distancia segura de seguimiento recomendada?",
    options: [
      "1 segundo",
      "2 segundos",
      "3 segundos",
      "5 segundos"
    ],
    correctAnswer: 2,
    explanation: "La regla de los 3 segundos te da tiempo suficiente para reaccionar. Con mal tiempo, aumenta a 5 o mas segundos.",
    category: "velocidad"
  },
  {
    id: 6,
    question: "Que debes hacer cuando escuchas una sirena de ambulancia?",
    options: [
      "Continuar conduciendo normalmente",
      "Acelerar para salir del camino",
      "Orillarte a la derecha y detenerte",
      "Detenerte inmediatamente donde estas"
    ],
    correctAnswer: 2,
    explanation: "Debes orillarte a la derecha de forma segura y detenerte para permitir el paso del vehiculo de emergencia.",
    category: "prioridad"
  },
  {
    id: 7,
    question: "Las senales amarillas de forma de diamante son:",
    options: [
      "Senales regulatorias",
      "Senales informativas",
      "Senales preventivas",
      "Senales de servicios"
    ],
    correctAnswer: 2,
    explanation: "Las senales amarillas son preventivas y advierten sobre curvas, pendientes, cruces o zonas de precaucion adelante.",
    category: "senales"
  },
  {
    id: 8,
    question: "En una interseccion sin senales, quien tiene prioridad?",
    options: [
      "El vehiculo mas rapido",
      "El vehiculo que viene por la izquierda",
      "El vehiculo que viene por la derecha",
      "El vehiculo mas grande"
    ],
    correctAnswer: 2,
    explanation: "En intersecciones sin senales, tiene prioridad el vehiculo que viene por la derecha.",
    category: "prioridad"
  },
  {
    id: 9,
    question: "Esta permitido usar el celular mientras conduces?",
    options: [
      "Si, siempre",
      "Solo para llamadas cortas",
      "Solo con manos libres",
      "Solo en semaforos"
    ],
    correctAnswer: 2,
    explanation: "Usar el celular sin manos libres esta prohibido. Es una de las principales causas de accidentes.",
    category: "normas"
  },
  {
    id: 10,
    question: "Cual es la velocidad maxima en autopistas de Costa Rica?",
    options: [
      "80 km/h",
      "100 km/h",
      "120 km/h",
      "140 km/h"
    ],
    correctAnswer: 2,
    explanation: "La velocidad maxima en autopistas es de 120 km/h donde este indicado. Siempre respeta las senales locales.",
    category: "velocidad"
  },
]

export function QuizScreen() {
  const [state, setState] = useState<QuizState>("menu")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean }[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])

  const startQuiz = (category: Category) => {
    setSelectedCategory(category)
    
    // Filter and shuffle questions
    let questions = category === "mixto" 
      ? [...allQuestions] 
      : allQuestions.filter(q => q.category === category)
    
    questions = questions.sort(() => Math.random() - 0.5).slice(0, 5)
    setQuizQuestions(questions)
    
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswers([])
    setTimeElapsed(0)
    setState("quiz")
  }

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
  }

  const handleConfirm = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer
    setAnswers(prev => [...prev, { questionId: quizQuestions[currentQuestion].id, correct: isCorrect }])
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setState("results")
    }
  }

  const resetQuiz = () => {
    setState("menu")
    setSelectedCategory(null)
    setQuizQuestions([])
    setAnswers([])
  }

  const correctCount = answers.filter(a => a.correct).length
  const question = quizQuestions[currentQuestion]
  const isCorrect = selectedAnswer === question?.correctAnswer

  if (state === "menu") {
    return (
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quiz</h1>
            <p className="text-muted-foreground">Pon a prueba tus conocimientos</p>
          </div>
          <VelioMascot size="md" mood="encouraging" />
        </div>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-[var(--velio-blue)]/20 to-[var(--velio-mint)]/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[var(--velio-blue)]">42</p>
                <p className="text-xs text-muted-foreground">Quizzes hechos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--velio-success)]">78%</p>
                <p className="text-xs text-muted-foreground">Promedio</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--velio-gold)]">156</p>
                <p className="text-xs text-muted-foreground">Respuestas correctas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Elige una Categoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant="outline"
                  className="w-full h-auto p-4 flex items-center gap-4 justify-start hover:bg-primary/5 hover:border-primary"
                  onClick={() => startQuiz(category.id)}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.questionCount} preguntas disponibles</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </Button>
              )
            })}
          </CardContent>
        </Card>

        {/* Tip */}
        <Card className="bg-[var(--velio-light-blue)]/30">
          <CardContent className="p-4 flex items-center gap-4">
            <VelioMascot size="sm" mood="happy" />
            <div>
              <p className="font-medium text-foreground text-sm">Tip de estudio</p>
              <p className="text-sm text-muted-foreground">
                Practica un poco cada dia. La consistencia es clave para recordar!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (state === "results") {
    const percentage = Math.round((correctCount / quizQuestions.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="p-4 space-y-6 max-w-md mx-auto">
        <Card className="border-2 border-[var(--velio-gold)]">
          <CardContent className="p-6 text-center space-y-4">
            <VelioMascot size="lg" mood={passed ? "celebrating" : "encouraging"} className="mx-auto" />
            
            <div>
              <p className="text-4xl font-bold text-[var(--velio-gold)]">{percentage}%</p>
              <p className="text-muted-foreground">
                {correctCount} de {quizQuestions.length} correctas
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-4 h-4 rounded-full",
                    answers[index]?.correct 
                      ? "bg-[var(--velio-success)]" 
                      : "bg-destructive"
                  )}
                />
              ))}
            </div>

            <div className={cn(
              "py-2 px-4 rounded-full inline-block",
              passed ? "bg-[var(--velio-success)]/20 text-[var(--velio-success)]" : "bg-amber-100 text-amber-800"
            )}>
              {passed ? "Excelente trabajo!" : "Sigue practicando!"}
            </div>

            <p className="text-sm text-[var(--velio-gold)]">
              +{correctCount * 20} XP ganados!
            </p>
          </CardContent>
        </Card>

        {/* Review answers */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Revision de respuestas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quizQuestions.map((q, index) => (
              <div key={q.id} className="flex items-center gap-3 text-sm">
                {answers[index]?.correct ? (
                  <CheckCircle2 className="w-5 h-5 text-[var(--velio-success)] flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                )}
                <span className="flex-1 line-clamp-1">{q.question}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => startQuiz(selectedCategory!)}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Repetir
          </Button>
          <Button className="flex-1" onClick={resetQuiz}>
            Ver Categorias
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Pregunta {currentQuestion + 1} de {quizQuestions.length}
          </p>
          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2 w-32 mt-1" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Star className="w-3 h-3 text-[var(--velio-gold)]" />
            {correctCount}/{currentQuestion + (showExplanation ? 1 : 0)}
          </Badge>
          <VelioMascot size="sm" mood={showExplanation ? (isCorrect ? "celebrating" : "encouraging") : "thinking"} />
        </div>
      </div>

      {/* Question */}
      <Card>
        <CardContent className="p-4">
          <p className="font-medium text-lg leading-relaxed">{question?.question}</p>
        </CardContent>
      </Card>

      {/* Options */}
      <Card>
        <CardContent className="p-3 space-y-2">
          {question?.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectOption = index === question.correctAnswer
            const showCorrect = showExplanation && isCorrectOption
            const showWrong = showExplanation && isSelected && !isCorrectOption

            return (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "w-full h-auto p-4 justify-start text-left whitespace-normal",
                  isSelected && !showExplanation && "border-primary bg-primary/10",
                  showCorrect && "border-[var(--velio-success)] bg-[var(--velio-success)]/10",
                  showWrong && "border-destructive bg-destructive/10"
                )}
                onClick={() => handleSelectAnswer(index)}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0",
                    isSelected && !showExplanation && "border-primary bg-primary text-primary-foreground",
                    showCorrect && "border-[var(--velio-success)] bg-[var(--velio-success)] text-white",
                    showWrong && "border-destructive bg-destructive text-white",
                    !isSelected && !showExplanation && "border-muted-foreground"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-[var(--velio-success)]" />}
                  {showWrong && <XCircle className="w-5 h-5 text-destructive" />}
                </div>
              </Button>
            )
          })}
        </CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className={cn(
          "border-2",
          isCorrect 
            ? "border-[var(--velio-success)] bg-[var(--velio-success)]/10" 
            : "border-amber-500 bg-amber-50"
        )}>
          <CardContent className="p-4">
            <p className="font-semibold mb-2">
              {isCorrect ? "Correcto!" : "Respuesta incorrecta"}
            </p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={resetQuiz}>
          Salir
        </Button>
        {!showExplanation ? (
          <Button 
            className="flex-1" 
            onClick={handleConfirm}
            disabled={selectedAnswer === null}
          >
            Confirmar
          </Button>
        ) : (
          <Button className="flex-1" onClick={handleNext}>
            {currentQuestion < quizQuestions.length - 1 ? "Siguiente" : "Ver Resultados"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
