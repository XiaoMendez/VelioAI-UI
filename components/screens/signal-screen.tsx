"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Camera, 
  Upload, 
  X, 
  CheckCircle2, 
  Image as ImageIcon,
  RotateCcw,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Scan
} from "lucide-react"
import { cn } from "@/lib/utils"
import { VelioMascot } from "@/components/velio-mascot"

type RecognitionState = "idle" | "camera" | "analyzing" | "result"

interface SignalResult {
  name: string
  type: "regulatoria" | "preventiva" | "informativa"
  description: string
  action: string
  confidence: number
}

// Signal catalog for browsing
const signalCatalog = [
  {
    id: "alto",
    name: "Alto",
    type: "regulatoria" as const,
    color: "#dc2626",
    shape: "octagon",
    description: "Detente completamente antes de la línea de parada",
  },
  {
    id: "ceda",
    name: "Ceda el Paso",
    type: "regulatoria" as const,
    color: "#dc2626",
    shape: "triangle",
    description: "Reduce velocidad y cede el paso a otros vehículos",
  },
  {
    id: "velocidad",
    name: "Velocidad Máxima",
    type: "regulatoria" as const,
    color: "#dc2626",
    shape: "circle",
    description: "No excedas la velocidad indicada",
  },
  {
    id: "curva",
    name: "Curva Peligrosa",
    type: "preventiva" as const,
    color: "#f59e0b",
    shape: "diamond",
    description: "Reduce velocidad, hay una curva adelante",
  },
  {
    id: "escuela",
    name: "Zona Escolar",
    type: "preventiva" as const,
    color: "#f59e0b",
    shape: "pentagon",
    description: "Reduce a 25 km/h, hay niños cerca",
  },
  {
    id: "hospital",
    name: "Hospital",
    type: "informativa" as const,
    color: "#3b82f6",
    shape: "rectangle",
    description: "Hay un hospital cerca, guarda silencio",
  },
]

const typeColors = {
  regulatoria: "bg-red-500/10 text-red-600 border-red-500/20",
  preventiva: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  informativa: "bg-blue-500/10 text-blue-600 border-blue-500/20",
}

export function SignalScreen() {
  const [state, setState] = useState<RecognitionState>("idle")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [result, setResult] = useState<SignalResult | null>(null)
  const [showCatalog, setShowCatalog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async () => {
    setState("camera")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      handleUploadClick()
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
    setState("idle")
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageData)
        stopCamera()
        analyzeImage()
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = () => {
    setState("analyzing")
    
    setTimeout(() => {
      const signals: SignalResult[] = [
        {
          name: "Señal de ALTO",
          type: "regulatoria",
          description: "La señal de ALTO indica que debes detener completamente tu vehículo antes de la línea de parada.",
          action: "Detente completamente, mira a ambos lados y continúa solo cuando sea seguro.",
          confidence: 94,
        },
        {
          name: "Ceda el Paso",
          type: "regulatoria",
          description: "Indica que debes reducir la velocidad y ceder el paso a los vehículos de la vía principal.",
          action: "Reduce la velocidad y deja pasar a otros vehículos antes de continuar.",
          confidence: 87,
        },
        {
          name: "Curva Peligrosa",
          type: "preventiva",
          description: "Advierte sobre una curva pronunciada adelante que requiere precaución.",
          action: "Reduce la velocidad antes de llegar a la curva y mantente en tu carril.",
          confidence: 91,
        },
      ]
      
      setResult(signals[Math.floor(Math.random() * signals.length)])
      setState("result")
    }, 2000)
  }

  const resetAnalysis = () => {
    setCapturedImage(null)
    setResult(null)
    setState("idle")
  }

  const getSignalShape = (signal: typeof signalCatalog[0]) => {
    switch (signal.shape) {
      case "octagon":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill={signal.color} stroke="white" strokeWidth="4" />
            <text x="50" y="58" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white">ALTO</text>
          </svg>
        )
      case "triangle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,90 10,20 90,20" fill="white" stroke={signal.color} strokeWidth="6" />
          </svg>
        )
      case "circle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="42" fill="white" stroke={signal.color} strokeWidth="6" />
            <text x="50" y="60" textAnchor="middle" fontSize="28" fontWeight="bold" fill={signal.color}>60</text>
          </svg>
        )
      case "diamond":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,50 50,95 5,50" fill={signal.color} stroke="black" strokeWidth="2" />
          </svg>
        )
      case "pentagon":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,35 80,90 20,90 5,35" fill={signal.color} stroke="black" strokeWidth="2" />
          </svg>
        )
      case "rectangle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="10" y="20" width="80" height="60" rx="6" fill={signal.color} stroke="white" strokeWidth="4" />
            <text x="50" y="60" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">H</text>
          </svg>
        )
    }
  }

  if (showCatalog) {
    return (
      <div className="px-5 py-6 space-y-5 max-w-lg mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setShowCatalog(false)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-bold text-lg text-foreground">Catálogo de Señales</h2>
            <p className="text-xs text-muted-foreground">Explora todas las señales</p>
          </div>
        </div>

        <div className="space-y-3">
          {signalCatalog.map((signal, index) => (
            <Card 
              key={signal.id} 
              className="border-0 shadow-soft bg-card/80 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 flex-shrink-0">
                  {getSignalShape(signal)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{signal.name}</h3>
                    <Badge variant="outline" className={cn("text-[10px] capitalize", typeColors[signal.type])}>
                      {signal.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{signal.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 py-6 space-y-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reconoce Señales</h1>
          <p className="text-muted-foreground text-sm">Aprende el significado de cada señal</p>
        </div>
        <VelioMascot size="md" mood={state === "result" ? "celebrating" : "happy"} />
      </div>

      {/* Camera/Upload Area */}
      {state === "idle" && (
        <Card className="border-0 shadow-soft-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col items-center justify-center gap-5 p-8">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
                <Scan className="w-10 h-10 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Captura una señal de tránsito</p>
                <p className="text-sm text-muted-foreground mt-1">Usa la cámara o sube una imagen</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={startCamera} className="gap-2 rounded-2xl h-12 px-6 shadow-soft">
                  <Camera className="w-4 h-4" />
                  Abrir Cámara
                </Button>
                <Button variant="outline" onClick={handleUploadClick} className="gap-2 rounded-2xl h-12 px-6">
                  <Upload className="w-4 h-4" />
                  Subir
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Camera View */}
      {state === "camera" && (
        <Card className="border-0 shadow-soft-lg overflow-hidden">
          <CardContent className="p-0 relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full aspect-[4/3] object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Camera overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 border-2 border-white/40 rounded-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 border-2 border-white/60 rounded-2xl" />
              </div>
            </div>
            
            {/* Camera controls */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
              <Button variant="secondary" size="icon" className="rounded-full w-12 h-12 bg-white/90" onClick={stopCamera}>
                <X className="w-5 h-5" />
              </Button>
              <Button size="lg" className="rounded-full w-16 h-16 shadow-soft-lg" onClick={capturePhoto}>
                <Camera className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analyzing */}
      {state === "analyzing" && (
        <Card className="border-0 shadow-soft-lg">
          <CardContent className="p-6">
            {capturedImage && (
              <img src={capturedImage} alt="Captured" className="w-full aspect-[4/3] object-cover rounded-2xl mb-6" />
            )}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Analizando imagen...</p>
                <p className="text-sm text-muted-foreground">Velio está identificando la señal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {state === "result" && result && (
        <>
          <Card className="border-0 shadow-soft-lg overflow-hidden">
            <CardContent className="p-5">
              {capturedImage && (
                <img src={capturedImage} alt="Captured" className="w-full aspect-[4/3] object-cover rounded-2xl mb-5" />
              )}
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className={cn("capitalize", typeColors[result.type])}>
                  {result.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {result.confidence}% confianza
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{result.name}</h3>
              <p className="text-muted-foreground mb-5">{result.description}</p>
              
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Qué debes hacer:</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.action}</p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Button onClick={resetAnalysis} className="w-full h-12 rounded-2xl gap-2 shadow-soft">
            <RotateCcw className="w-4 h-4" />
            Analizar otra señal
          </Button>
        </>
      )}

      {/* Quick Actions */}
      {state === "idle" && (
        <>
          <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Aprende las señales</h3>
                  <p className="text-xs text-muted-foreground">Explora el catálogo completo</p>
                </div>
              </div>
              
              <button
                className="w-full p-4 rounded-2xl flex items-center gap-4 text-left bg-secondary/50 hover:bg-secondary transition-all duration-200 active:scale-[0.98]"
                onClick={() => setShowCatalog(true)}
              >
                <div className="w-12 h-12 rounded-xl bg-velio-gold/10 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-velio-gold" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Catálogo de Señales</p>
                  <p className="text-sm text-muted-foreground">Explora todas las señales de tránsito</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>

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
                  Practica identificando señales mientras caminas o viajas como pasajero
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
