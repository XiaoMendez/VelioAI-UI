"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Camera, 
  Upload, 
  X, 
  CheckCircle2, 
  Image as ImageIcon,
  RotateCcw,
  Info,
  ChevronRight
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
    color: "#ef4444",
    shape: "octagon",
    description: "Detente completamente antes de la linea de parada",
  },
  {
    id: "ceda",
    name: "Ceda el Paso",
    type: "regulatoria" as const,
    color: "#eab308",
    shape: "triangle",
    description: "Reduce velocidad y cede el paso a otros vehiculos",
  },
  {
    id: "velocidad",
    name: "Velocidad Maxima",
    type: "regulatoria" as const,
    color: "#ef4444",
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
    description: "Reduce a 25 km/h, hay ninos cerca",
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
  regulatoria: "bg-red-100 text-red-800 border-red-200",
  preventiva: "bg-amber-100 text-amber-800 border-amber-200",
  informativa: "bg-blue-100 text-blue-800 border-blue-200",
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
      // Fallback to upload mode
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
    
    // Simulate AI analysis
    setTimeout(() => {
      // Random result for demo
      const signals: SignalResult[] = [
        {
          name: "Senal de ALTO",
          type: "regulatoria",
          description: "La senal de ALTO indica que debes detener completamente tu vehiculo antes de la linea de parada.",
          action: "Detente completamente, mira a ambos lados y continua solo cuando sea seguro.",
          confidence: 94,
        },
        {
          name: "Ceda el Paso",
          type: "regulatoria",
          description: "Indica que debes reducir la velocidad y ceder el paso a los vehiculos de la via principal.",
          action: "Reduce la velocidad y deja pasar a otros vehiculos antes de continuar.",
          confidence: 87,
        },
        {
          name: "Curva Peligrosa",
          type: "preventiva",
          description: "Advierte sobre una curva pronunciada adelante que requiere precaucion.",
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
            <polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill={signal.color} stroke="white" strokeWidth="3" />
          </svg>
        )
      case "triangle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,90 10,20 90,20" fill="white" stroke={signal.color} strokeWidth="5" />
          </svg>
        )
      case "circle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="white" stroke={signal.color} strokeWidth="5" />
            <text x="50" y="60" textAnchor="middle" fontSize="24" fontWeight="bold" fill={signal.color}>60</text>
          </svg>
        )
      case "diamond":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 90,50 50,90 10,50" fill={signal.color} stroke="black" strokeWidth="3" />
          </svg>
        )
      case "pentagon":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,35 80,90 20,90 5,35" fill={signal.color} stroke="black" strokeWidth="3" />
          </svg>
        )
      case "rectangle":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="10" y="25" width="80" height="50" rx="5" fill={signal.color} stroke="white" strokeWidth="3" />
            <text x="50" y="58" textAnchor="middle" fontSize="12" fill="white">H</text>
          </svg>
        )
    }
  }

  if (showCatalog) {
    return (
      <div className="p-4 space-y-4 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowCatalog(false)}>
            <X className="w-5 h-5" />
          </Button>
          <h2 className="font-bold text-lg flex-1">Catalogo de Senales</h2>
        </div>

        <div className="space-y-3">
          {signalCatalog.map((signal) => (
            <Card key={signal.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 flex-shrink-0">
                  {getSignalShape(signal)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{signal.name}</h3>
                    <Badge variant="outline" className={cn("text-xs", typeColors[signal.type])}>
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
    <div className="p-4 space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reconoce Senales</h1>
          <p className="text-muted-foreground">Aprende el significado de cada senal</p>
        </div>
        <VelioMascot size="md" mood={state === "result" ? "celebrating" : "happy"} />
      </div>

      {/* Camera/Upload Area */}
      {state === "idle" && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-[4/3] bg-gradient-to-b from-[var(--velio-blue)]/20 to-[var(--velio-mint)]/20 flex flex-col items-center justify-center gap-4 p-6">
              <div className="w-24 h-24 rounded-full bg-[var(--velio-blue)]/20 flex items-center justify-center">
                <Camera className="w-12 h-12 text-[var(--velio-blue)]" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Captura una senal de transito</p>
                <p className="text-sm text-muted-foreground">Usa la camara o sube una imagen</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={startCamera} className="gap-2">
                  <Camera className="w-4 h-4" />
                  Abrir Camara
                </Button>
                <Button variant="outline" onClick={handleUploadClick} className="gap-2">
                  <Upload className="w-4 h-4" />
                  Subir Imagen
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
        <Card className="overflow-hidden">
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
              <div className="absolute inset-8 border-2 border-white/50 rounded-xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 border-2 border-white rounded-lg" />
              </div>
            </div>
            
            {/* Camera controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full bg-white/90" onClick={stopCamera}>
                <X className="w-5 h-5" />
              </Button>
              <Button size="lg" className="rounded-full w-16 h-16" onClick={capturePhoto}>
                <Camera className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analyzing */}
      {state === "analyzing" && (
        <Card>
          <CardContent className="p-6">
            {capturedImage && (
              <img src={capturedImage} alt="Captured" className="w-full aspect-[4/3] object-cover rounded-xl mb-4" />
            )}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--velio-blue)]/20 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[var(--velio-blue)] border-t-transparent rounded-full animate-spin" />
              </div>
              <div>
                <p className="font-medium">Analizando imagen...</p>
                <p className="text-sm text-muted-foreground">Velio esta identificando la senal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {state === "result" && result && (
        <>
          <Card>
            <CardContent className="p-4">
              {capturedImage && (
                <img src={capturedImage} alt="Captured" className="w-full aspect-[4/3] object-cover rounded-xl mb-4" />
              )}
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className={cn(typeColors[result.type])}>
                  {result.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {result.confidence}% de confianza
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{result.name}</h3>
              <p className="text-muted-foreground mb-4">{result.description}</p>
              
              <Card className="bg-[var(--velio-light-blue)]/30 border-[var(--velio-blue)]/30">
                <CardContent className="p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--velio-blue)]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[var(--velio-blue)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Que debes hacer:</p>
                    <p className="text-sm text-muted-foreground">{result.action}</p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Button onClick={resetAnalysis} className="w-full gap-2">
            <RotateCcw className="w-4 h-4" />
            Analizar otra senal
          </Button>
        </>
      )}

      {/* Quick Actions */}
      {state === "idle" && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Aprende las senales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full h-auto p-3 flex items-center gap-3 justify-start"
                onClick={() => setShowCatalog(true)}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">Catalogo de Senales</p>
                  <p className="text-xs text-muted-foreground">Explora todas las senales de transito</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Button>
            </CardContent>
          </Card>

          {/* Velio tip */}
          <Card className="bg-[var(--velio-light-blue)]/30">
            <CardContent className="p-4 flex items-center gap-4">
              <VelioMascot size="sm" mood="encouraging" />
              <div>
                <p className="font-medium text-foreground text-sm">Consejo de Velio</p>
                <p className="text-sm text-muted-foreground">
                  Practica identificando senales mientras caminas o viajas como pasajero!
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
