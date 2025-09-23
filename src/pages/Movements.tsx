import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Calendar as CalendarIcon,
  Download,
  Eye
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data
const mockMovements = [
  {
    id: 1,
    date: "2024-01-16",
    time: "14:30:25",
    productCode: "CAM001",
    productName: "Camiseta Basic Blanca",
    type: "Entrada",
    quantity: 50,
    reason: "Compra",
    notes: "Reposición stock temporada",
    user: "Admin",
    balanceAfter: 95
  },
  {
    id: 2,
    date: "2024-01-16", 
    time: "12:15:10",
    productCode: "PAN002",
    productName: "Pantalón Skinny Negro", 
    type: "Salida",
    quantity: 12,
    reason: "Venta",
    notes: "Venta online pedido #1234",
    user: "Vendedor1",
    balanceAfter: 8
  },
  {
    id: 3,
    date: "2024-01-15",
    time: "16:45:30",
    productCode: "VES003",
    productName: "Vestido Floral Verano",
    type: "Salida", 
    quantity: 2,
    reason: "Dañado",
    notes: "Productos dañados durante transporte",
    user: "Admin",
    balanceAfter: 0
  },
  {
    id: 4,
    date: "2024-01-15",
    time: "11:20:45",
    productCode: "ZAP004",
    productName: "Zapatillas Running",
    type: "Entrada",
    quantity: 30,
    reason: "Compra", 
    notes: "Nueva colección primavera",
    user: "Admin",
    balanceAfter: 25
  },
  {
    id: 5,
    date: "2024-01-14",
    time: "09:30:15",
    productCode: "ACC005", 
    productName: "Gorra Deportiva",
    type: "Ajuste",
    quantity: 5,
    reason: "Ajuste",
    notes: "Corrección inventario físico",
    user: "Admin",
    balanceAfter: 12
  }
]

const movementTypes = ["Entrada", "Salida", "Ajuste"]
const reasons = {
  "Entrada": ["Compra", "Devolución", "Transferencia", "Ajuste"],
  "Salida": ["Venta", "Dañado", "Vencido", "Transferencia", "Ajuste"], 
  "Ajuste": ["Ajuste", "Corrección", "Inventario físico"]
}

export default function Movements() {
  const [movements] = useState(mockMovements)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedReason, setSelectedReason] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newMovement, setNewMovement] = useState({
    type: "",
    reason: "",
    productCode: "",
    quantity: "",
    notes: ""
  })

  const getMovementBadge = (type: string) => {
    const badges = {
      "Entrada": <Badge className="bg-success text-success-foreground"><ArrowUp className="w-3 h-3 mr-1" />Entrada</Badge>,
      "Salida": <Badge className="bg-info text-info-foreground"><ArrowDown className="w-3 h-3 mr-1" />Salida</Badge>, 
      "Ajuste": <Badge variant="outline" className="text-warning border-warning"><RotateCcw className="w-3 h-3 mr-1" />Ajuste</Badge>
    }
    return badges[type as keyof typeof badges] || badges["Ajuste"]
  }

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movement.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movement.user.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || movement.type === selectedType
    const matchesReason = selectedReason === "all" || movement.reason === selectedReason
    
    let matchesDate = true
    if (dateFrom && dateTo) {
      const movementDate = new Date(movement.date)
      matchesDate = movementDate >= dateFrom && movementDate <= dateTo
    }

    return matchesSearch && matchesType && matchesReason && matchesDate
  })

  const totalMovements = movements.length
  const entradas = movements.filter(m => m.type === "Entrada").length
  const salidas = movements.filter(m => m.type === "Salida").length  
  const ajustes = movements.filter(m => m.type === "Ajuste").length

  const handleCreateMovement = () => {
    // Logic to create movement
    console.log("Creating movement:", newMovement)
    setIsCreateDialogOpen(false)
    setNewMovement({ type: "", reason: "", productCode: "", quantity: "", notes: "" })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Movimientos de Stock</h1>
          <p className="text-muted-foreground">
            Historial completo de entradas, salidas y ajustes de inventario
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Movimiento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Registrar Movimiento</DialogTitle>
                <DialogDescription>
                  Crear un nuevo movimiento de stock
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Movimiento</Label>
                  <Select value={newMovement.type} onValueChange={(value) => 
                    setNewMovement({...newMovement, type: value, reason: ""})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {movementTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {newMovement.type && (
                  <div className="space-y-2">
                    <Label htmlFor="reason">Motivo</Label>
                    <Select value={newMovement.reason} onValueChange={(value) =>
                      setNewMovement({...newMovement, reason: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasons[newMovement.type as keyof typeof reasons]?.map(reason => (
                          <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="productCode">Código del Producto</Label>
                  <Input 
                    id="productCode"
                    placeholder="Ej: CAM001"
                    value={newMovement.productCode}
                    onChange={(e) => setNewMovement({...newMovement, productCode: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input 
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={newMovement.quantity}
                    onChange={(e) => setNewMovement({...newMovement, quantity: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Notas adicionales..."
                    value={newMovement.notes}
                    onChange={(e) => setNewMovement({...newMovement, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleCreateMovement}
                  disabled={!newMovement.type || !newMovement.reason || !newMovement.productCode || !newMovement.quantity}
                >
                  Registrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movimientos</CardTitle>
            <RotateCcw className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalMovements}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas</CardTitle>
            <ArrowUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{entradas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salidas</CardTitle>
            <ArrowDown className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{salidas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ajustes</CardTitle>
            <RotateCcw className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{ajustes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {movementTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger>
                <SelectValue placeholder="Motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los motivos</SelectItem>
                <SelectItem value="Compra">Compra</SelectItem>
                <SelectItem value="Venta">Venta</SelectItem>
                <SelectItem value="Dañado">Dañado</SelectItem>
                <SelectItem value="Devolución">Devolución</SelectItem>
                <SelectItem value="Ajuste">Ajuste</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Fecha desde"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "dd/MM/yyyy") : "Fecha hasta"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Movimientos</CardTitle>
          <CardDescription>
            {filteredMovements.length} movimiento(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead className="text-center">Balance</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.map((movement) => (
                <TableRow key={movement.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{movement.date}</div>
                      <div className="text-sm text-muted-foreground font-mono">{movement.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{movement.productName}</div>
                      <div className="text-sm text-muted-foreground font-mono">{movement.productCode}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getMovementBadge(movement.type)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-mono font-bold text-lg ${
                      movement.type === 'Entrada' ? 'text-success' : 
                      movement.type === 'Salida' ? 'text-info' : 'text-warning'
                    }`}>
                      {movement.type === 'Entrada' ? '+' : movement.type === 'Salida' ? '-' : '±'}{movement.quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{movement.reason}</div>
                      {movement.notes && (
                        <div className="text-sm text-muted-foreground">{movement.notes}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{movement.user}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-mono font-bold">{movement.balanceAfter}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}