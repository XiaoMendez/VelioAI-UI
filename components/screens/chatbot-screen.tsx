"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { VelioMascot } from "@/components/velio-mascot"

interface Message {
  id: string
  text: string
  sender: "user" | "velio"
  timestamp: Date
}

const GREETING = `¡Hola! Soy Velio, tu asistente de manejo. Estoy aquí para ayudarte a aprender a conducir de forma segura y sin presión. ¿Sobre qué tema te gustaría practicar hoy?`

const quickQuestions = [
  "¿Qué significa la señal de ALTO?",
  "¿Quién tiene prioridad en una rotonda?",
  "¿Cuántos metros de distancia debo mantener?",
  "¿Qué hago si el semáforo está en amarillo?",
]

// Simulated responses based on knowledge base
const knowledgeBase: Record<string, string> = {
  "alto": "La señal de ALTO (ese octágono rojo) significa que debes detener completamente el vehículo antes de la línea de parada. Espera a que el camino esté libre antes de continuar. No hacer un alto completo es una infracción grave según la Ley de Tránsito. ¡Más vale dos segundos de pausa que un susto!",
  "ceda": "La señal de CEDA EL PASO (triángulo invertido) te indica que debes reducir la velocidad y dejar pasar a los vehículos que circulan por la vía principal. Solo avanza cuando estés seguro de que es seguro hacerlo. ¡La paciencia aquí es tu mejor aliada!",
  "rotonda": "¡Las rotondas no son tan complicadas! Los vehículos que ya circulan DENTRO de la rotonda tienen prioridad. Para entrar, debes ceder el paso a quienes ya están dentro y esperar un espacio seguro. La circulación siempre es en sentido antihorario. ¡Practica y verás que se vuelve natural!",
  "amarillo": "La luz AMARILLA del semáforo es una advertencia: significa que la luz está a punto de cambiar a rojo. Debes prepararte para detenerte de forma segura. Solo continúa si ya estás tan cerca de la línea que frenar sería peligroso. ¡No es una señal para acelerar!",
  "distancia": "La distancia segura se calcula con la regla de los 3 SEGUNDOS. Cuando el carro de adelante pasa un punto fijo, tú deberías pasar ese mismo punto 3 segundos después. Con lluvia o mal tiempo, aumenta a 5 o más segundos. ¡Esa distancia es tu tiempo de reacción en caso de emergencia!",
  "velocidad": "Los límites de velocidad en Costa Rica son: Zona urbana: 40-60 km/h | Carreteras secundarias: 60-80 km/h | Autopistas: hasta 120 km/h (donde esté indicado). Siempre respeta las señales locales. Recuerda: ¡los límites son máximos, no metas!",
  "peaton": "El peatón tiene PRIORIDAD en los pasos peatonales señalizados. Como conductor, debes reducir la velocidad y detenerte completamente si alguien está cruzando o está a punto de hacerlo. ¡Todos somos peatones en algún momento!",
  "emergencia": "Los vehículos de emergencia (ambulancias, bomberos, policía) con sirenas y luces encendidas tienen PRIORIDAD ABSOLUTA. Cuando los escuches, orílate a la derecha y detente hasta que pasen. ¡Tu colaboración puede salvar una vida!",
  "punto ciego": "El PUNTO CIEGO es esa zona alrededor de tu vehículo que los espejos no logran cubrir. Para reducir el riesgo: ajusta bien todos tus espejos y, antes de cambiar de carril, gira la cabeza para revisar ese ángulo. ¡Un movimiento de cabeza de un segundo puede salvarte de un accidente enorme!",
  "celular": "Usar el celular al manejar sin manos libres está PROHIBIDO. Es una de las principales causas de accidentes. La multa es alta y, más importante, distrae tu atención cuando más la necesitas. Si es urgente, estaciona en un lugar seguro y luego haz tu llamada.",
  "contraseña": "¿Preguntaste sobre contraseña? Parece que te confundiste de app. Pero si quieres aprender sobre señales de tránsito o normas de manejo, ¡aquí estoy para ayudarte!",
}

const NO_ENTENDIDO = "No estoy seguro de haber entendido eso. ¿Podrías decirlo de otra forma? También puedo ayudarte con señales, normas, prioridad de paso o seguridad vial."

const DESPEDIDA = "¡Buen trabajo hoy! Recuerda que aprender a manejar toma práctica, pero vas por muy buen camino. ¡Éxitos en tu examen!"

function getVelioResponse(userMessage: string): string {
  const messageLower = userMessage.toLowerCase()
  
  if (messageLower.includes("adios") || messageLower.includes("chao") || messageLower.includes("hasta luego")) {
    return DESPEDIDA
  }
  
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (messageLower.includes(key)) {
      return response
    }
  }
  
  if (messageLower.includes("hola") || messageLower.includes("buenos") || messageLower.includes("que tal")) {
    return GREETING
  }
  
  return NO_ENTENDIDO
}

export function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      text: GREETING,
      sender: "velio",
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800))

    const velioResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getVelioResponse(text),
      sender: "velio",
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages(prev => [...prev, velioResponse])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-lg mx-auto lg:max-w-3xl">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-4">
          <VelioMascot size="md" mood="happy" />
          <div className="flex-1">
            <h1 className="font-bold text-lg text-foreground">Velio</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-velio-success animate-pulse" />
              <span className="text-xs text-muted-foreground">Tu asistente de manejo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-slide-up",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {message.sender === "velio" && (
              <VelioMascot size="sm" mood="happy" className="flex-shrink-0 mt-1" />
            )}
            <div
              className={cn(
                "max-w-[80%] lg:max-w-[70%] rounded-2xl px-4 py-3 shadow-soft",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border/50 rounded-bl-md"
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <p className={cn(
                "text-[10px] mt-2 opacity-60",
                message.sender === "user" ? "text-right" : "text-left"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 items-start animate-fade-in">
            <VelioMascot size="sm" mood="thinking" className="flex-shrink-0" />
            <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md px-5 py-4 shadow-soft">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preguntas sugeridas</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="text-xs px-3 py-2 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="sticky bottom-0 px-4 py-4 bg-background/80 backdrop-blur-xl border-t border-border/50">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="pr-12 h-12 rounded-2xl bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground rounded-full"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            type="submit" 
            size="icon" 
            className="h-12 w-12 rounded-2xl shadow-soft"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
