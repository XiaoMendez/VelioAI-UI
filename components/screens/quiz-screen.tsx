"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
  Zap,
  Target,
  Sparkles
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

const categories: { id: Category; name: string; icon: React.ElementType; questionCount: number; color: string }[] = [
  { id: "senales", name: "Señales de Tránsito", icon: BookOpen, questionCount: 15, color: "primary" },
  { id: "prioridad", name: "Prioridad de Paso", icon: Trophy, questionCount: 12, color: "accent" },
  { id: "normas", name: "Normas de Circulación", icon: BookOpen, questionCount: 18, color: "primary" },
  { id: "velocidad", name: "Velocidad y Distancia", icon: Clock, questionCount: 10, color: "accent" },
  { id: "mixto", name: "Examen Mixto", icon: Zap, questionCount: 20, color: "velio-gold" },
]

const allQuestions: Question[] = [
  {
    id: 1,
    question: "¿Qué significa la señal de ALTO (octágono rojo)?",
    options: [
      "Reducir la velocidad",
      "Detenerse completamente antes de la línea",
      "Ceder el paso si hay tráfico",
      "Continuar con precaución"
    ],
    correctAnswer: 1,
    explanation: "La señal de ALTO significa que debes detener completamente el vehículo antes de la línea de parada y solo continuar cuando el camino esté libre.",
    category: "senales"
  },
  {
    id: 2,
    question: "¿Quién tiene prioridad en una rotonda?",
    options: [
      "El vehículo que va a entrar",
      "El vehículo más grande",
      "Los vehículos que ya circulan dentro",
      "El vehículo que llega primero"
    ],
    correctAnswer: 2,
    explanation: "Los vehículos que ya circulan dentro de la rotonda siempre tienen prioridad. Debes ceder el paso antes de entrar.",
    category: "prioridad"
  },
  {
    id: 3,
    question: "¿Cuál es la velocidad máxima permitida en zonas escolares?",
    options: [
      "40 km/h",
      "30 km/h", 
      "25 km/h",
      "35 km/h"
    ],
    correctAnswer: 2,
    explanation: "En zonas escolares el límite es de 25 km/h, especialmente durante los horarios de entrada y salida de clases.",
    category: "velocidad"
  },
  {
    id: 4,
    question: "¿Qué indica la luz amarilla del semáforo?",
    options: [
      "Acelerar para pasar",
      "Detenerse inmediatamente",
      "Prepararse para detenerse de forma segura",
      "Continuar sin cambios"
    ],
    correctAnswer: 2,
    explanation: "La luz amarilla es una advertencia de que la luz cambiará a rojo. Debes prepararte para detenerte de forma segura.",
    category: "normas"
  },
  {
    id: 5,
    question: "¿Cuál es la distancia segura de seguimiento recomendada?",
    options: [
      "1 segundo",
      "2 segundos",
      "3 segundos",
      "5 segundos"
    ],
    correctAnswer: 2,
    explanation: "La regla de los 3 segundos te da tiempo suficiente para reaccionar. Con mal tiempo, aumenta a 5 o más segundos.",
    category: "velocidad"
  },
  {
    id: 6,
    question: "¿Qué debes hacer cuando escuchas una sirena de ambulancia?",
    options: [
      "Continuar conduciendo normalmente",
      "Acelerar para salir del camino",
      "Orillarte a la derecha y detenerte",
      "Detenerte inmediatamente donde estás"
    ],
    correctAnswer: 2,
    explanation: "Debes orillarte a la derecha de forma segura y detenerte para permitir el paso del vehículo de emergencia.",
    category: "prioridad"
  },
  {
    id: 7,
    question: "Las señales amarillas de forma de diamante son:",
    options: [
      "Señales regulatorias",
      "Señales informativas",
      "Señales preventivas",
      "Señales de servicios"
    ],
    correctAnswer: 2,
    explanation: "Las señales amarillas son preventivas y advierten sobre curvas, pendientes, cruces o zonas de precaución adelante.",
    category: "senales"
  },
  {
    id: 8,
    question: "En una intersección sin señales, ¿quién tiene prioridad?",
    options: [
      "El vehículo más rápido",
      "El vehículo que viene por la izquierda",
      "El vehículo que viene por la derecha",
      "El vehículo más grande"
    ],
    correctAnswer: 2,
    explanation: "En intersecciones sin señales, tiene prioridad el vehículo que viene por la derecha.",
    category: "prioridad"
  },
  {
    id: 9,
    question: "¿Está permitido usar el celular mientras conduces?",
    options: [
      "Sí, siempre",
      "Solo para llamadas cortas",
      "Solo con manos libres",
      "Solo en semáforos"
    ],
    correctAnswer: 2,
    explanation: "Usar el celular sin manos libres está prohibido. Es una de las principales causas de accidentes.",
    category: "normas"
  },
  {
    id: 10,
    question: "¿Cuál es la velocidad máxima en autopistas de Costa Rica?",
    options: [
      "80 km/h",
      "100 km/h",
      "120 km/h",
      "140 km/h"
    ],
    correctAnswer: 2,
    explanation: "La velocidad máxima en autopistas es de 120 km/h donde esté indicado. Siempre respeta las señales locales.",
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
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([])

  const startQuiz = (category: Category) => {
    setSelectedCategory(category)
    
    let questions = category === "mixto" 
      ? [...allQuestions] 
      : allQuestions.filter(q => q.category === category)
    
    questions = questions.sort(() => Math.random() - 0.5).slice(0, 5)
    setQuizQuestions(questions)
    
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswers([])
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
      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto lg:max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <VelioMascot size="md" mood="encouraging" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Quiz</h1>
              <p className="text-muted-foreground text-sm">Pon a prueba tus conocimientos</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <Card className="border-0 shadow-soft overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <CardContent className="relative p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">42</p>
                <p className="text-xs text-muted-foreground">Quizzes hechos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-velio-success">78%</p>
                <p className="text-xs text-muted-foreground">Promedio</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-velio-gold">156</p>
                <p className="text-xs text-muted-foreground">Correctas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories - Grid on desktop */}
        <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Elige una Categoría</h3>
                <p className="text-xs text-muted-foreground">Selecciona el tema a practicar</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    className="w-full p-4 rounded-2xl flex items-center gap-4 text-left bg-secondary/50 hover:bg-secondary transition-all duration-200 active:scale-[0.98]"
                    onClick={() => startQuiz(category.id)}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      category.color === "primary" && "bg-primary/10",
                      category.color === "accent" && "bg-accent/10",
                      category.color === "velio-gold" && "bg-velio-gold/10"
                    )}>
                      <Icon className={cn(
                        "w-6 h-6",
                        category.color === "primary" && "text-primary",
                        category.color === "accent" && "text-accent",
                        category.color === "velio-gold" && "text-velio-gold"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.questionCount} preguntas</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tip */}
        <Card className="border-0 shadow-soft bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-5 flex items-center gap-4">
            <VelioMascot size="sm" mood="happy" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-velio-gold" />
                <p className="font-semibold text-foreground text-sm">Tip de estudio</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Practica un poco cada día. ¡La consistencia es clave!
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
      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto lg:max-w-2xl">
        <Card className="border-2 border-velio-gold/30 shadow-soft-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-velio-gold/5 to-transparent" />
          <CardContent className="relative p-8 text-center space-y-5">
            <VelioMascot size="xl" mood={passed ? "celebrating" : "encouraging"} className="mx-auto" />
            
            <div>
              <p className="text-5xl font-bold text-velio-gold">{percentage}%</p>
              <p className="text-muted-foreground mt-1">
                {correctCount} de {quizQuestions.length} correctas
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-4 h-4 rounded-full transition-colors",
                    answers[index]?.correct 
                      ? "bg-velio-success" 
                      : "bg-destructive"
                  )}
                />
              ))}
            </div>

            <Badge className={cn(
              "text-sm py-2 px-4",
              passed 
                ? "bg-velio-success/10 text-velio-success border-velio-success/30" 
                : "bg-velio-warning/10 text-velio-warning border-velio-warning/30"
            )}>
              {passed ? "¡Excelente trabajo!" : "¡Sigue practicando!"}
            </Badge>

            <p className="text-sm font-medium text-velio-gold">
              +{correctCount * 20} XP ganados
            </p>
          </CardContent>
        </Card>

        {/* Review */}
        <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-4">Revisión de respuestas</h3>
            <div className="space-y-3">
              {quizQuestions.map((q, index) => (
                <div key={q.id} className="flex items-center gap-3 text-sm">
                  {answers[index]?.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-velio-success flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  )}
                  <span className="flex-1 line-clamp-1 text-foreground">{q.question}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 h-12 rounded-2xl" 
            onClick={() => startQuiz(selectedCategory!)}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Repetir
          </Button>
          <Button className="flex-1 h-12 rounded-2xl shadow-soft" onClick={resetQuiz}>
            Ver Categorías
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 space-y-5 max-w-lg mx-auto lg:max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Pregunta {currentQuestion + 1} de {quizQuestions.length}
          </p>
          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2 w-32 mt-2" />
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 py-1.5">
            <Star className="w-3.5 h-3.5 text-velio-gold" />
            {correctCount}/{currentQuestion + (showExplanation ? 1 : 0)}
          </Badge>
          <VelioMascot size="sm" mood={showExplanation ? (isCorrect ? "celebrating" : "encouraging") : "thinking"} />
        </div>
      </div>

      {/* Question */}
      <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
        <CardContent className="p-5">
          <p className="font-semibold text-lg leading-relaxed text-foreground">{question?.question}</p>
        </CardContent>
      </Card>

      {/* Options */}
      <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 space-y-3">
          {question?.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectOption = index === question.correctAnswer
            const showCorrect = showExplanation && isCorrectOption
            const showWrong = showExplanation && isSelected && !isCorrectOption

            return (
              <button
                key={index}
                className={cn(
                  "w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all duration-200",
                  "border-2",
                  isSelected && !showExplanation && "border-primary bg-primary/5",
                  showCorrect && "border-velio-success bg-velio-success/5",
                  showWrong && "border-destructive bg-destructive/5",
                  !isSelected && !showExplanation && "border-border/50 hover:border-primary/50 hover:bg-secondary/30",
                  showExplanation && !showCorrect && !showWrong && "opacity-50"
                )}
                onClick={() => handleSelectAnswer(index)}
                disabled={showExplanation}
              >
                <span className={cn(
                  "w-9 h-9 rounded-xl border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors",
                  isSelected && !showExplanation && "border-primary bg-primary text-primary-foreground",
                  showCorrect && "border-velio-success bg-velio-success text-white",
                  showWrong && "border-destructive bg-destructive text-white",
                  !isSelected && !showExplanation && "border-border"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-foreground">{option}</span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-velio-success" />}
                {showWrong && <XCircle className="w-5 h-5 text-destructive" />}
              </button>
            )
          })}
        </CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className={cn(
          "border-2 shadow-soft animate-slide-up",
          isCorrect 
            ? "border-velio-success/30 bg-velio-success/5" 
            : "border-velio-warning/30 bg-velio-warning/5"
        )}>
          <CardContent className="p-5">
            <p className="font-semibold mb-2 text-foreground">
              {isCorrect ? "¡Correcto!" : "Respuesta incorrecta"}
            </p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 h-12 rounded-2xl" onClick={resetQuiz}>
          Salir
        </Button>
        {!showExplanation ? (
          <Button 
            className="flex-1 h-12 rounded-2xl shadow-soft" 
            onClick={handleConfirm}
            disabled={selectedAnswer === null}
          >
            Confirmar
          </Button>
        ) : (
          <Button className="flex-1 h-12 rounded-2xl shadow-soft" onClick={handleNext}>
            {currentQuestion < quizQuestions.length - 1 ? "Siguiente" : "Ver Resultados"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
