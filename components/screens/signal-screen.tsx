"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Filter,
  BookOpen
} from "lucide-react"
import { cn } from "@/lib/utils"
import { VelioMascot } from "@/components/velio-mascot"

interface SignalDetail {
  id: string
  name: string
  type: "regulatoria" | "preventiva" | "informativa"
  description: string
  action: string
  shape: string
  color: string
}

// Extended signal catalog
const signalCatalog: SignalDetail[] = [
  {
    id: "alto",
    name: "Alto",
    type: "regulatoria",
    color: "#dc2626",
    shape: "octagon",
    description: "Detente completamente antes de la línea de parada. Espera a que el camino esté libre antes de continuar.",
    action: "Detente por completo, observa en ambas direcciones y avanza solo cuando sea seguro."
  },
  {
    id: "ceda",
    name: "Ceda el Paso",
    type: "regulatoria",
    color: "#dc2626",
    shape: "triangle",
    description: "Reduce velocidad y cede el paso a los vehículos de la vía principal.",
    action: "Disminuye la velocidad, mira y cede el paso a otros vehículos antes de continuar."
  },
  {
    id: "velocidad-40",
    name: "Velocidad Máxima 40",
    type: "regulatoria",
    color: "#dc2626",
    shape: "circle",
    description: "No excedas los 40 km/h en esta zona. Generalmente en áreas urbanas o residenciales.",
    action: "Mantén tu velocidad por debajo de 40 km/h."
  },
  {
    id: "velocidad-60",
    name: "Velocidad Máxima 60",
    type: "regulatoria",
    color: "#dc2626",
    shape: "circle",
    description: "No excedas los 60 km/h. Común en avenidas principales y zonas comerciales.",
    action: "Mantén tu velocidad por debajo de 60 km/h."
  },
  {
    id: "no-estacionar",
    name: "No Estacionar",
    type: "regulatoria",
    color: "#dc2626",
    shape: "circle",
    description: "Prohibido estacionar vehículos en esta zona.",
    action: "Busca un lugar permitido para estacionar tu vehículo."
  },
  {
    id: "no-girar",
    name: "Prohibido Girar",
    type: "regulatoria",
    color: "#dc2626",
    shape: "circle",
    description: "No está permitido girar en la dirección indicada.",
    action: "Continúa recto y busca otra ruta para llegar a tu destino."
  },
  {
    id: "curva-derecha",
    name: "Curva a la Derecha",
    type: "preventiva",
    color: "#f59e0b",
    shape: "diamond",
    description: "Hay una curva pronunciada hacia la derecha más adelante.",
    action: "Reduce la velocidad antes de llegar a la curva y mantente en tu carril."
  },
  {
    id: "curva-izquierda",
    name: "Curva a la Izquierda",
    type: "preventiva",
    color: "#f59e0b",
    shape: "diamond",
    description: "Hay una curva pronunciada hacia la izquierda más adelante.",
    action: "Reduce la velocidad antes de llegar a la curva y mantente en tu carril."
  },
  {
    id: "curva-peligrosa",
    name: "Curva Peligrosa",
    type: "preventiva",
    color: "#f59e0b",
    shape: "diamond",
    description: "Curva muy cerrada o peligrosa adelante. Extrema precaución.",
    action: "Reduce considerablemente la velocidad y mantén ambas manos en el volante."
  },
  {
    id: "escuela",
    name: "Zona Escolar",
    type: "preventiva",
    color: "#f59e0b",
    shape: "pentagon",
    description: "Área cercana a una escuela. Hay niños en la zona.",
    action: "Reduce a 25 km/h y estate muy atento a peatones, especialmente niños."
  },
  {
    id: "peatones",
    name: "Cruce Peatonal",
    type: "preventiva",
    color: "#f59e0b",
    shape: "diamond",
    description: "Hay un cruce peatonal adelante.",
    action: "Reduce la velocidad y prepárate para ceder el paso a peatones."
  },
  {
    id: "resbaladizo",
    name: "Pavimento Resbaladizo",
    type: "preventiva",
    color: "#f59e0b",
    shape: "diamond",
    description: "El pavimento puede estar resbaladizo, especialmente con lluvia.",
    action: "Reduce la velocidad y evita frenadas bruscas o giros repentinos."
  },
  {
    id: "hospital",
    name: "Hospital",
    type: "informativa",
    color: "#3b82f6",
    shape: "rectangle",
    description: "Hay un hospital o centro médico cerca.",
    action: "Guarda silencio (no uses el claxon) y respeta los límites de velocidad."
  },
  {
    id: "gasolinera",
    name: "Gasolinera",
    type: "informativa",
    color: "#3b82f6",
    shape: "rectangle",
    description: "Hay una estación de servicio cerca.",
    action: "Si necesitas combustible, prepárate para tomar la salida."
  },
  {
    id: "estacionamiento",
    name: "Estacionamiento",
    type: "informativa",
    color: "#3b82f6",
    shape: "rectangle",
    description: "Hay un estacionamiento disponible.",
    action: "Si necesitas estacionar, sigue las indicaciones hacia el estacionamiento."
  },
  {
    id: "restaurante",
    name: "Restaurante",
    type: "informativa",
    color: "#3b82f6",
    shape: "rectangle",
    description: "Hay servicios de alimentación disponibles.",
    action: "Si deseas parar a comer, prepárate para tomar la salida."
  },
]

const typeColors = {
  regulatoria: "bg-red-500/10 text-red-600 border-red-500/20",
  preventiva: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  informativa: "bg-blue-500/10 text-blue-600 border-blue-500/20",
}

const typeLabels = {
  regulatoria: "Regulatoria",
  preventiva: "Preventiva",
  informativa: "Informativa",
}

export function SignalScreen() {
  const [selectedSignal, setSelectedSignal] = useState<SignalDetail | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "regulatoria" | "preventiva" | "informativa">("all")

  const filteredSignals = signalCatalog.filter(signal => {
    const matchesSearch = signal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "all" || signal.type === activeFilter
    return matchesSearch && matchesFilter
  })

  const getSignalShape = (signal: SignalDetail, size: "sm" | "lg" = "sm") => {
    const sizePx = size === "sm" ? 64 : 120
    
    switch (signal.shape) {
      case "octagon":
        return (
          <svg viewBox="0 0 100 100" width={sizePx} height={sizePx}>
            <polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill={signal.color} stroke="white" strokeWidth="4" />
            <text x="50" y="58" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white">ALTO</text>
          </svg>
        )
      case "triangle":
        return (
          <svg viewBox="0 0 100 100" width={sizePx} height={sizePx}>
            <polygon points="50,90 10,20 90,20" fill="white" stroke={signal.color} strokeWidth="6" />
          </svg>
        )
      case "circle":
        const speedMatch = signal.name.match(/\d+/)
        const speedText = speedMatch ? speedMatch[0] : ""
        const showSpeed = signal.name.includes("Velocidad")
        return (
          <svg viewBox="0 0 100 100" width={sizePx} height={sizePx}>
            <circle cx="50" cy="50" r="42" fill="white" stroke={signal.color} strokeWidth="6" />
            {showSpeed ? (
              <text x="50" y="60" textAnchor="middle" fontSize="28" fontWeight="bold" fill={signal.color}>{speedText}</text>
            ) : (
              <line x1="25" y1="25" x2="75" y2="75" stroke={signal.color} strokeWidth="6" />
            )}
          </svg>
        )
      case "diamond":
        return (
          <svg viewBox="0 0 100 100" width={sizePx} height={sizePx}>
            <polygon points="50,5 95,50 50,95 5,50" fill={signal.color} stroke="black" strokeWidth="2" />
          </svg>
        )
      case "pentagon":
        return (
          <svg viewBox="0 0 100 100" width={sizePx} height={sizePx}>
            <polygon points="50,5 95,35 80,90 20,90 5,35" fill={signal.color} stroke="black" strokeWidth="2" />
          </svg>
        )
      case "rectangle":
        const infoText = signal.name === "Hospital" ? "H" : signal.name === "Gasolinera" ? "G" : "P"
        return (
          <svg viewBox="0 0 100 100" width={sizePx} height={sizePx}>
            <rect x="10" y="20" width="80" height="60" rx="6" fill={signal.color} stroke="white" strokeWidth="4" />
            <text x="50" y="60" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">{infoText}</text>
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 100 100" width={sizePx} height={sizePx}>
            <circle cx="50" cy="50" r="42" fill={signal.color} stroke="white" strokeWidth="4" />
          </svg>
        )
    }
  }

  // Signal detail view
  if (selectedSignal) {
    return (
      <div className="px-4 py-6 space-y-5 max-w-lg mx-auto lg:max-w-4xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setSelectedSignal(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-bold text-lg text-foreground">{selectedSignal.name}</h2>
            <Badge variant="outline" className={cn("text-[10px] capitalize mt-1", typeColors[selectedSignal.type])}>
              {typeLabels[selectedSignal.type]}
            </Badge>
          </div>
        </div>

        <Card className="border-0 shadow-soft-lg overflow-hidden">
          <CardContent className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:gap-8 items-center">
              <div className="flex justify-center mb-6 lg:mb-0">
                {getSignalShape(selectedSignal, "lg")}
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Descripción</h3>
                  <p className="text-muted-foreground">{selectedSignal.description}</p>
                </div>
                
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">¿Qué debes hacer?</p>
                      <p className="text-sm text-muted-foreground mt-1">{selectedSignal.action}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={() => setSelectedSignal(null)} variant="outline" className="w-full h-12 rounded-2xl gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 space-y-6 max-w-lg mx-auto lg:max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <VelioMascot size="md" mood="happy" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Señales de Tránsito</h1>
            <p className="text-muted-foreground text-sm">Aprende el significado de cada señal</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Buscar señales..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 rounded-2xl bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          className="rounded-full px-4 flex-shrink-0"
          onClick={() => setActiveFilter("all")}
        >
          <Filter className="w-4 h-4 mr-2" />
          Todas
        </Button>
        <Button
          variant={activeFilter === "regulatoria" ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full px-4 flex-shrink-0",
            activeFilter === "regulatoria" && "bg-red-500 hover:bg-red-600"
          )}
          onClick={() => setActiveFilter("regulatoria")}
        >
          Regulatorias
        </Button>
        <Button
          variant={activeFilter === "preventiva" ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full px-4 flex-shrink-0",
            activeFilter === "preventiva" && "bg-amber-500 hover:bg-amber-600"
          )}
          onClick={() => setActiveFilter("preventiva")}
        >
          Preventivas
        </Button>
        <Button
          variant={activeFilter === "informativa" ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full px-4 flex-shrink-0",
            activeFilter === "informativa" && "bg-blue-500 hover:bg-blue-600"
          )}
          onClick={() => setActiveFilter("informativa")}
        >
          Informativas
        </Button>
      </div>

      {/* Signal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSignals.map((signal, index) => (
          <Card 
            key={signal.id} 
            className="border-0 shadow-soft bg-card/80 backdrop-blur-sm cursor-pointer hover:shadow-soft-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] animate-slide-up"
            style={{ animationDelay: `${index * 30}ms` }}
            onClick={() => setSelectedSignal(signal)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-shrink-0">
                {getSignalShape(signal)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{signal.name}</h3>
                </div>
                <Badge variant="outline" className={cn("text-[10px] capitalize", typeColors[signal.type])}>
                  {typeLabels[signal.type]}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{signal.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSignals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron señales con ese criterio</p>
        </div>
      )}

      {/* Velio tip */}
      <Card className="border-0 shadow-soft bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-5 flex items-center gap-4">
          <VelioMascot size="sm" mood="encouraging" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-velio-gold" />
              <p className="font-semibold text-foreground text-sm">Consejo de Velio</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Practica identificando señales mientras caminas o viajas como pasajero. ¡La repetición te ayudará a memorizarlas!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
