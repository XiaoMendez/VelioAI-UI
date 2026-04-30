"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
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

const GREETING = `Hola! Soy Velio. Estoy aqui para ayudarte a aprender a manejar a tu ritmo y sin presion. Sobre que tema quieres practicar hoy?`

const quickQuestions = [
  "Que significa la senal de ALTO?",
  "Quien tiene prioridad en una rotonda?",
  "Cuantos metros de distancia debo mantener?",
  "Que hago si el semaforo esta en amarillo?",
]

// Simulated responses based on the knowledge base from Velio.py
const knowledgeBase: Record<string, string> = {
  "alto": "La senal de ALTO (ese octagono rojo) significa que debes detener completamente el vehiculo antes de la linea de parada. Espera a que el camino este libre antes de continuar. No hacer un alto completo es una infraccion grave segun la Ley de Transito. Mas vale dos segundos de pausa que un susto!",
  "ceda": "La senal de CEDA EL PASO (triangulo invertido) te indica que debes reducir la velocidad y dejar pasar a los vehiculos que circulan por la via principal. Solo avanza cuando estes seguro de que es seguro hacerlo. La paciencia aqui es tu mejor aliada!",
  "rotonda": "Las rotondas no son tan complicadas! Los vehiculos que ya circulan DENTRO de la rotonda tienen prioridad. Para entrar, debes ceder el paso a quienes ya estan dentro y esperar un espacio seguro. La circulacion siempre es en sentido antihorario. Practica y veras que se vuelve natural!",
  "amarillo": "La luz AMARILLA del semaforo es una advertencia: significa que la luz esta a punto de cambiar a rojo. Debes prepararte para detenerte de forma segura. Solo continua si ya estas tan cerca de la linea que frenar seria peligroso. No es una senal para acelerar!",
  "distancia": "La distancia segura se calcula con la regla de los 3 SEGUNDOS. Cuando el carro de adelante pasa un punto fijo, tu deberias pasar ese mismo punto 3 segundos despues. Con lluvia o mal tiempo, aumenta a 5 o mas segundos. Esa distancia es tu tiempo de reaccion en caso de emergencia!",
  "velocidad": "Los limites de velocidad en Costa Rica son: Zona urbana: 40-60 km/h | Carreteras secundarias: 60-80 km/h | Autopistas: hasta 120 km/h (donde este indicado). Siempre respeta las senales locales. Recuerda: los limites son maximos, no metas!",
  "peaton": "El peaton tiene PRIORIDAD en los pasos peatonales senalizados. Como conductor, debes reducir la velocidad y detenerte completamente si alguien esta cruzando o esta a punto de hacerlo. Todos somos peatones en algun momento!",
  "emergencia": "Los vehiculos de emergencia (ambulancias, bomberos, policia) con sirenas y luces encendidas tienen PRIORIDAD ABSOLUTA. Cuando los escuches, orillate a la derecha y detente hasta que pasen. Tu colaboracion puede salvar una vida!",
  "punto ciego": "El PUNTO CIEGO es esa zona alrededor de tu vehiculo que los espejos no logran cubrir. Para reducir el riesgo: ajusta bien todos tus espejos y, antes de cambiar de carril, gira la cabeza para revisar ese angulo. Un movimiento de cabeza de un segundo puede salvarte de un accidente enorme!",
  "celular": "Usar el celular al manejar sin manos libres esta PROHIBIDO. Es una de las principales causas de accidentes. La multa es alta y, mas importante, distrae tu atencion cuando mas la necesitas. Si es urgente, estaciona en un lugar seguro y luego haz tu llamada!",
}

const NO_ENTENDIDO = "No estoy seguro de haber entendido eso. Podrias decirlo de otra forma? Tambien puedo ayudarte con senales, normas, prioridad de paso o seguridad vial."

const DESPEDIDA = "Buen trabajo hoy! Recuerda que aprender a manejar toma practica, pero vas por muy buen camino. Exitos en tu examen!"

function getVelioResponse(userMessage: string): string {
  const messageLower = userMessage.toLowerCase()
  
  // Check for goodbye
  if (messageLower.includes("adios") || messageLower.includes("chao") || messageLower.includes("hasta luego")) {
    return DESPEDIDA
  }
  
  // Search in knowledge base
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (messageLower.includes(key)) {
      return response
    }
  }
  
  // Check for greetings
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

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

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
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-md mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <VelioMascot size="md" mood="happy" />
          <div>
            <h1 className="font-bold text-lg">Velio</h1>
            <p className="text-sm text-muted-foreground">Tu asistente de manejo</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-[var(--velio-success)]">
            <span className="w-2 h-2 rounded-full bg-[var(--velio-success)] animate-pulse" />
            <span className="text-xs">En linea</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-2",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.sender === "velio" && (
              <VelioMascot size="sm" mood="happy" className="flex-shrink-0" />
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border border-border rounded-bl-sm"
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <p className={cn(
                "text-xs mt-1",
                message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2 items-end">
            <VelioMascot size="sm" mood="thinking" className="flex-shrink-0" />
            <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Preguntas sugeridas
          </p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-2 px-3"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="pr-10 rounded-full"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
