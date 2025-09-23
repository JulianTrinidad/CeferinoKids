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
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  QrCode,
  Download,
  Filter,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search
} from "lucide-react"

// Mock data
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
    price: 29.99,
    available: true
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
    price: 49.99,
    available: true
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
    price: 69.99,
    available: false
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
    price: 89.99,
    available: true
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
    price: 19.99,
    available: true
  }
]

const categories = ["Camisetas", "Pantalones", "Vestidos", "Abrigos", "Calzado", "Accesorios", "Bebés"]
const ageGroups = ["Bebés (0-2)", "Niños (3-12)", "Adolescentes (13-17)", "Adultos (18+)"]
const seasons = ["Primavera", "Verano", "Otoño", "Invierno", "Todo el año"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "42", "UNI"]
const colors = ["Negro", "Blanco", "Azul", "Rojo", "Verde", "Amarillo", "Gris", "Rosa", "Morado", "Naranja", "Multicolor"]

export default function QRGenerator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all") 
  const [selectedSeason, setSelectedSeason] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedColor, setSelectedColor] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [qrSize, setQrSize] = useState("medium")
  const [includePrice, setIncludePrice] = useState(true)
  const [includeStock, setIncludeStock] = useState(false)

  const getStatusBadge = (product: any) => {
    if (product.quantity === 0) {
      return <Badge variant="destructive" className="bg-danger text-danger-foreground"><XCircle className="w-3 h-3 mr-1" />Agotado</Badge>
    }
    if (product.quantity <= 10) {
      return <Badge variant="outline" className="text-warning border-warning"><AlertTriangle className="w-3 h-3 mr-1" />Poco Stock</Badge>
    }
    return <Badge variant="default" className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />Disponible</Badge>
  }

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesAge = selectedAge === "all" || product.age === selectedAge
    const matchesSeason = selectedSeason === "all" || product.season === selectedSeason
    const matchesSize = selectedSize === "all" || product.size === selectedSize
    const matchesColor = selectedColor === "all" || product.color === selectedColor
    
    let matchesAvailability = true
    if (availabilityFilter === "available") matchesAvailability = product.available
    if (availabilityFilter === "unavailable") matchesAvailability = !product.available

    return matchesSearch && matchesCategory && matchesAge && matchesSeason && 
           matchesSize && matchesColor && matchesAvailability
  })

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const generateQRData = () => {
    const selectedProductData = filteredProducts.filter(p => selectedProducts.includes(p.id))
    return {
      products: selectedProductData.map(p => ({
        code: p.code,
        name: p.name,
        category: p.category,
        ...(includePrice && { price: p.price }),
        ...(includeStock && { stock: p.quantity })
      })),
      generated: new Date().toISOString(),
      source: "StyleStock"
    }
  }

  const downloadQR = () => {
    // QR generation logic would go here
    // For now, just show what would be generated
    const qrData = generateQRData()
    console.log("QR Data:", JSON.stringify(qrData, null, 2))
    alert(`QR generado con ${selectedProducts.length} producto(s)`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Generador de Códigos QR</h1>
        <p className="text-muted-foreground">
          Genera códigos QR personalizados para tus productos con filtros avanzados
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Filters Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros de Productos
              </CardTitle>
              <CardDescription>
                Aplica filtros para seleccionar los productos que deseas incluir en el QR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar productos..."
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
                    <SelectValue placeholder="Grupo de edad" />
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

                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Disponibilidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los productos</SelectItem>
                    <SelectItem value="available">Solo disponibles</SelectItem>
                    <SelectItem value="unavailable">Solo agotados</SelectItem>
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
                    setAvailabilityFilter("all")
                  }}
                  className="md:col-span-2 lg:col-span-1"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Productos Filtrados
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{filteredProducts.length} productos</Badge>
                  <Badge variant="outline">{selectedProducts.length} seleccionados</Badge>
                </div>
              </CardTitle>
              <CardDescription>
                Selecciona los productos que quieres incluir en el código QR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Detalles</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Checkbox 
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => handleSelectProduct(product.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.code}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            <Badge variant="outline">{product.category}</Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div><span className="font-medium">Talla:</span> {product.size}</div>
                          <div><span className="font-medium">Color:</span> {product.color}</div>
                          <div><span className="font-medium">Temporada:</span> {product.season}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono font-bold">{product.quantity}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(product)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* QR Generator Panel */}
        <div className="space-y-6">
          {/* QR Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Configuración del QR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-size">Tamaño del QR</Label>
                <Select value={qrSize} onValueChange={setQrSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeño (200x200)</SelectItem>
                    <SelectItem value="medium">Mediano (400x400)</SelectItem>
                    <SelectItem value="large">Grande (600x600)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Información a Incluir</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-price"
                      checked={includePrice}
                      onCheckedChange={(checked) => setIncludePrice(!!checked)}
                    />
                    <Label htmlFor="include-price">Incluir precios</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-stock"
                      checked={includeStock}
                      onCheckedChange={(checked) => setIncludeStock(!!checked)}
                    />
                    <Label htmlFor="include-stock">Incluir stock disponible</Label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={downloadQR}
                  disabled={selectedProducts.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generar y Descargar QR
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa del QR</CardTitle>
              <CardDescription>
                Código QR con {selectedProducts.length} producto(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg min-h-[200px]">
                {selectedProducts.length > 0 ? (
                  <div className="text-center space-y-4">
                    <QrCode className="w-24 h-24 mx-auto text-primary" />
                    <div className="text-sm text-muted-foreground">
                      Vista previa del código QR
                      <br />
                      {selectedProducts.length} producto(s) seleccionado(s)
                      <br />
                      Tamaño: {qrSize === 'small' ? '200x200' : qrSize === 'medium' ? '400x400' : '600x600'}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-2" />
                    <p>Selecciona productos para generar el QR</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Productos totales:</span>
                  <Badge variant="outline">{mockProducts.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Productos filtrados:</span>
                  <Badge variant="outline">{filteredProducts.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Productos seleccionados:</span>
                  <Badge className="bg-primary text-primary-foreground">{selectedProducts.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Incluir precios:</span>
                  <Badge variant={includePrice ? "default" : "outline"}>
                    {includePrice ? "Sí" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Incluir stock:</span>
                  <Badge variant={includeStock ? "default" : "outline"}>
                    {includeStock ? "Sí" : "No"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}