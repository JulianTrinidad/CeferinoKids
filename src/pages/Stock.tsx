import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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
import { 
  Plus, 
  Search, 
  Filter, 
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown
} from "lucide-react"

// Mock data
const mockInventory = [
  {
    id: 1,
    code: "CAM001",
    name: "Camiseta Basic Blanca",
    category: "Camisetas",
    size: "M",
    color: "Blanco",
    age: "Adultos (18+)",
    season: "Todo el año",
    quantity: 45,
    minStock: 10,
    maxStock: 100,
    cost: 15.00,
    price: 29.99,
    lastMovement: "2024-01-15",
    rotation: "Alta"
  },
  {
    id: 2,
    code: "PAN002", 
    name: "Pantalón Skinny Negro",
    category: "Pantalones",
    size: "32",
    color: "Negro", 
    age: "Adolescentes (13-17)",
    season: "Todo el año",
    quantity: 8,
    minStock: 15,
    maxStock: 60,
    cost: 25.00,
    price: 49.99,
    lastMovement: "2024-01-14",
    rotation: "Media"
  },
  {
    id: 3,
    code: "VES003",
    name: "Vestido Floral Verano",
    category: "Vestidos",
    size: "S",
    color: "Multicolor",
    age: "Adultos (18+)",
    season: "Verano", 
    quantity: 0,
    minStock: 8,
    maxStock: 40,
    cost: 30.00,
    price: 69.99,
    lastMovement: "2024-01-10",
    rotation: "Baja"
  },
  {
    id: 4,
    code: "ZAP004",
    name: "Zapatillas Running",
    category: "Calzado",
    size: "40",
    color: "Azul",
    age: "Adultos (18+)",
    season: "Todo el año",
    quantity: 25,
    minStock: 6,
    maxStock: 50,
    cost: 45.00,
    price: 89.99,
    lastMovement: "2024-01-16",
    rotation: "Alta"
  }
]

const categories = ["Camisetas", "Pantalones", "Vestidos", "Abrigos", "Calzado", "Accesorios", "Bebés"]
const ageGroups = ["Bebés (0-2)", "Niños (3-12)", "Adolescentes (13-17)", "Adultos (18+)"]
const seasons = ["Primavera", "Verano", "Otoño", "Invierno", "Todo el año"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "42"]
const colors = ["Negro", "Blanco", "Azul", "Rojo", "Verde", "Amarillo", "Gris", "Rosa", "Morado", "Naranja"]

export default function Stock() {
  const [inventory] = useState(mockInventory)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all") 
  const [selectedSeason, setSelectedSeason] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedColor, setSelectedColor] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [isAddStockDialogOpen, setIsAddStockDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  

  const getStatusBadge = (product: any) => {
    if (product.quantity === 0) {
      return <Badge variant="destructive" className="bg-danger text-danger-foreground"><XCircle className="w-3 h-3 mr-1" />Sin Stock</Badge>
    }
    if (product.quantity <= product.minStock) {
      return <Badge variant="outline" className="text-warning border-warning"><AlertTriangle className="w-3 h-3 mr-1" />Stock Bajo</Badge>
    }
    return <Badge variant="default" className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />En Stock</Badge>
  }

  const getRotationBadge = (rotation: string) => {
    const badges = {
      "Alta": <Badge className="bg-success text-success-foreground"><TrendingUp className="w-3 h-3 mr-1" />Alta</Badge>,
      "Media": <Badge variant="outline" className="text-warning border-warning">Media</Badge>,
      "Baja": <Badge variant="outline" className="text-danger border-danger"><TrendingDown className="w-3 h-3 mr-1" />Baja</Badge>
    }
    return badges[rotation as keyof typeof badges] || badges["Media"]
  }

  const filteredInventory = inventory.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesAge = selectedAge === "all" || product.age === selectedAge
    const matchesSeason = selectedSeason === "all" || product.season === selectedSeason
    const matchesSize = selectedSize === "all" || product.size === selectedSize
    const matchesColor = selectedColor === "all" || product.color === selectedColor
    
    let matchesStock = true
    if (stockFilter === "inStock") matchesStock = product.quantity > product.minStock
    if (stockFilter === "lowStock") matchesStock = product.quantity > 0 && product.quantity <= product.minStock
    if (stockFilter === "outOfStock") matchesStock = product.quantity === 0

    return matchesSearch && matchesCategory && matchesAge && matchesSeason && 
           matchesSize && matchesColor && matchesStock
  })

  const totalProducts = inventory.length
  const inStock = inventory.filter(p => p.quantity > p.minStock).length
  const lowStock = inventory.filter(p => p.quantity > 0 && p.quantity <= p.minStock).length
  const outOfStock = inventory.filter(p => p.quantity === 0).length
  const totalValue = inventory.reduce((sum, p) => sum + (p.quantity * p.cost), 0)

  const handleAddStock = (product: any) => {
    setSelectedProduct(product)
    setIsAddStockDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Producto</DialogTitle>
              <DialogDescription>
                Añade un nuevo producto a tu inventario
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código del Producto</Label>
                <Input id="code" placeholder="Ej: CAM001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input id="name" placeholder="Ej: Camiseta Basic" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Talla</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona talla" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Grupo de Edad</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona edad" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageGroups.map(age => (
                      <SelectItem key={age} value={age}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="season">Temporada</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona temporada" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map(season => (
                      <SelectItem key={season} value={season}>{season}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad Inicial</Label>
                <Input id="quantity" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Precio de Costo</Label>
                <Input id="cost" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio de Venta</Label>
                <Input id="price" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lowStock">Stock Mínimo</Label>
                <Input id="lowStock" type="number" placeholder="10" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Descripción del producto..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Crear Producto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Stock</h1>
        <p className="text-muted-foreground">
          Control completo del inventario y movimientos de stock
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Stock</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{inStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sin Stock</CardTitle>
            <XCircle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{outOfStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <Package className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-info">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros Avanzados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger>
                <SelectValue placeholder="Edad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las edades</SelectItem>
                {ageGroups.map(age => (
                  <SelectItem key={age} value={age}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Temporada" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las temporadas</SelectItem>
                {seasons.map(season => (
                  <SelectItem key={season} value={season}>{season}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Talla" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las tallas</SelectItem>
                {sizes.map(size => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los colores</SelectItem>
                {colors.map(color => (
                  <SelectItem key={color} value={color}>{color}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado de Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="inStock">En Stock</SelectItem>
                <SelectItem value="lowStock">Stock Bajo</SelectItem>
                <SelectItem value="outOfStock">Sin Stock</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedAge("all") 
                setSelectedSeason("all")
                setSelectedSize("all")
                setSelectedColor("all")
                setStockFilter("all")
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventario Completo</CardTitle>
          <CardDescription>
            {filteredInventory.length} producto(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Detalles</TableHead>
                <TableHead className="text-center">Stock Actual</TableHead>
                <TableHead className="text-center">Min/Max</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">Rotación</TableHead>
                <TableHead className="text-center">Valor</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">{product.code}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Último movimiento: {product.lastMovement}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div><span className="font-medium">Talla:</span> {product.size}</div>
                      <div><span className="font-medium">Color:</span> {product.color}</div>
                      <div><span className="font-medium">Temporada:</span> {product.season}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-mono font-bold text-lg">{product.quantity}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm">
                      <div>Min: <span className="font-mono">{product.minStock}</span></div>
                      <div>Max: <span className="font-mono">{product.maxStock}</span></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(product)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getRotationBadge(product.rotation)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm">
                      <div className="font-bold">${(product.quantity * product.cost).toFixed(2)}</div>
                      <div className="text-muted-foreground">@${product.cost.toFixed(2)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddStock(product)}
                        className="text-primary hover:text-primary"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Agregar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Stock Dialog */}
      <Dialog open={isAddStockDialogOpen} onOpenChange={setIsAddStockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Stock</DialogTitle>
            <DialogDescription>
              {selectedProduct && `Añadir stock al producto: ${selectedProduct.name} (${selectedProduct.code})`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Stock actual</Label>
                <Input value={selectedProduct?.quantity || 0} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addQuantity">Cantidad a agregar</Label>
                <Input id="addQuantity" type="number" placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Compra</SelectItem>
                  <SelectItem value="return">Devolución</SelectItem>
                  <SelectItem value="adjustment">Ajuste de inventario</SelectItem>
                  <SelectItem value="transfer">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Input id="notes" placeholder="Notas adicionales..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStockDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Agregar Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}