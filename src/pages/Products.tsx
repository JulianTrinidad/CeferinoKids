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
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react"

// Mock data
const categories = ["Camisetas", "Pantalones", "Vestidos", "Abrigos", "Calzado", "Accesorios", "Bebés"]
const ageGroups = ["Bebés (0-2)", "Niños (3-12)", "Adolescentes (13-17)", "Adultos (18+)"]
const seasons = ["Primavera", "Verano", "Otoño", "Invierno", "Todo el año"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "42"]
const colors = ["Negro", "Blanco", "Azul", "Rojo", "Verde", "Amarillo", "Gris", "Rosa", "Morado", "Naranja"]

const mockProducts = [
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
    cost: 15.00,
    price: 29.99,
    description: "Camiseta básica de algodón 100%",
    lowStock: 10,
    status: "En Stock"
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
    cost: 25.00,
    price: 49.99,
    description: "Pantalón skinny fit de mezclilla",
    lowStock: 15,
    status: "Stock Bajo"
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
    cost: 30.00,
    price: 69.99,
    description: "Vestido de verano con estampado floral",
    lowStock: 8,
    status: "Sin Stock"
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
    cost: 45.00,
    price: 89.99,
    description: "Zapatillas deportivas para running",
    lowStock: 6,
    status: "En Stock"
  },
  {
    id: 5,
    code: "ACC005",
    name: "Gorra Deportiva",
    category: "Accesorios",
    size: "UNI",
    color: "Rojo",
    age: "Adultos (18+)",
    season: "Verano",
    quantity: 12,
    cost: 8.00,
    price: 19.99,
    description: "Gorra ajustable deportiva",
    lowStock: 12,
    status: "En Stock"
  }
]

export default function Products() {
  const [products] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getStatusBadge = (product: any) => {
    if (product.quantity === 0) {
      return <Badge variant="destructive" className="bg-danger text-danger-foreground"><XCircle className="w-3 h-3 mr-1" />Sin Stock</Badge>
    }
    if (product.quantity <= product.lowStock) {
      return <Badge variant="outline" className="text-warning border-warning"><AlertTriangle className="w-3 h-3 mr-1" />Stock Bajo</Badge>
    }
    return <Badge variant="default" className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />En Stock</Badge>
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesAge = selectedAge === "all" || product.age === selectedAge

    return matchesSearch && matchesCategory && matchesAge
  })

  const totalProducts = products.length
  const inStock = products.filter(p => p.quantity > p.lowStock).length
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= p.lowStock).length
  const outOfStock = products.filter(p => p.quantity === 0).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Productos</h1>
          <p className="text-muted-foreground">
            Administra tu catálogo de productos StyleStock
          </p>
        </div>
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
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
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
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, código o categoría..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
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
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Grupo de edad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las edades</SelectItem>
                {ageGroups.map(age => (
                  <SelectItem key={age} value={age}>{age}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
          <CardDescription>
            {filteredProducts.length} producto(s) encontrado(s)
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
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">{product.code}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div><span className="font-medium">Talla:</span> {product.size}</div>
                      <div><span className="font-medium">Color:</span> {product.color}</div>
                      <div><span className="font-medium">Edad:</span> {product.age}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-mono font-bold">{product.quantity}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(product)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="text-right">
                      <div className="font-bold">${product.price.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Costo: ${product.cost.toFixed(2)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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