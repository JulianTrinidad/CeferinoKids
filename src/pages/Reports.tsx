import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Calendar as CalendarIcon,
  Download,
  PieChart,
  Activity
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data
const financialData = {
  totalRevenue: 45600,
  totalCost: 28400,
  grossProfit: 17200,
  profitMargin: 37.7,
  totalSales: 156,
  averageTicket: 292.31
}

const categoryPerformance = [
  { category: "Camisetas", sales: 45, revenue: 1349.55, profit: 674.55, margin: 50.0 },
  { category: "Pantalones", sales: 32, revenue: 1599.68, profit: 799.68, margin: 50.0 },
  { category: "Vestidos", sales: 18, revenue: 1259.82, profit: 719.82, margin: 57.1 },
  { category: "Calzado", sales: 24, revenue: 2159.76, profit: 1079.76, margin: 50.0 },
  { category: "Accesorios", sales: 37, revenue: 739.63, profit: 443.63, margin: 60.0 }
]

const topProducts = [
  { name: "Camiseta Basic Blanca", sales: 12, revenue: 359.88, profit: 179.88 },
  { name: "Pantalón Skinny Negro", sales: 8, revenue: 399.92, profit: 199.92 },
  { name: "Zapatillas Running", sales: 6, revenue: 539.94, profit: 269.94 },
  { name: "Vestido Floral Verano", sales: 4, revenue: 279.96, profit: 159.96 },
  { name: "Gorra Deportiva", sales: 15, revenue: 299.85, proof: 179.85 }
]

const stockRotation = [
  { product: "Camiseta Basic Blanca", rotation: "Alta", days: 15, status: "Excelente" },
  { product: "Pantalón Skinny Negro", rotation: "Media", days: 45, status: "Buena" },
  { product: "Vestido Floral Verano", rotation: "Baja", days: 120, status: "Lenta" },
  { product: "Zapatillas Running", rotation: "Alta", days: 20, status: "Excelente" },
  { product: "Gorra Deportiva", rotation: "Media", days: 60, status: "Buena" }
]

const assets = [
  { item: "Inventario Total", value: 28400, type: "Corriente" },
  { item: "Efectivo", value: 15200, type: "Corriente" },
  { item: "Cuentas por Cobrar", value: 3200, type: "Corriente" },
  { item: "Equipos", value: 12000, type: "Fijo" },
  { item: "Local Comercial", value: 85000, type: "Fijo" }
]

const liabilities = [
  { item: "Cuentas por Pagar", value: 8400, type: "Corriente" },
  { item: "Préstamo Bancario", value: 25000, type: "Largo Plazo" },
  { item: "Salarios por Pagar", value: 4200, type: "Corriente" }
]

export default function Reports() {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0)
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0)
  const equity = totalAssets - totalLiabilities

  const getRotationBadge = (rotation: string) => {
    const badges = {
      "Alta": <Badge className="bg-success text-success-foreground">Alta</Badge>,
      "Media": <Badge variant="outline" className="text-warning border-warning">Media</Badge>,
      "Baja": <Badge variant="outline" className="text-danger border-danger">Baja</Badge>
    }
    return badges[rotation as keyof typeof badges] || badges["Media"]
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reportes y Análisis</h1>
          <p className="text-muted-foreground">
            Análisis financiero y operativo completo de StyleStock
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedPeriod === "custom" && (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Desde"}
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
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "dd/MM/yyyy") : "Hasta"}
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
            </>
          )}
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial">Financiero</TabsTrigger>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="balance">Balance</TabsTrigger>
        </TabsList>

        {/* Financial Reports */}
        <TabsContent value="financial" className="space-y-6">
          {/* Financial Summary */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
                <DollarSign className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">${financialData.totalRevenue.toLocaleString()}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Costos</CardTitle>
                <TrendingDown className="h-4 w-4 text-danger" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-danger">${financialData.totalCost.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilidad Bruta</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">${financialData.grossProfit.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Margen</CardTitle>
                <BarChart3 className="h-4 w-4 text-info" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-info">{financialData.profitMargin}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
                <Package className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{financialData.totalSales}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                <Activity className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">${financialData.averageTicket.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Ingresos</CardTitle>
                <CardDescription>Últimos 30 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                  Gráfico de líneas - Ingresos diarios
                  <br />
                  (Se implementará con Chart.js)
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ingresos vs Costos</CardTitle>
                <CardDescription>Comparativa mensual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                  Gráfico de barras - Ingresos vs Costos
                  <br />
                  (Se implementará con Chart.js)
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inventory Reports */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rotación de Inventario</CardTitle>
              <CardDescription>
                Análisis de la velocidad de rotación por producto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-center">Rotación</TableHead>
                    <TableHead className="text-center">Días Promedio</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockRotation.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell className="text-center">
                        {getRotationBadge(item.rotation)}
                      </TableCell>
                      <TableCell className="text-center font-mono">{item.days} días</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={
                          item.status === 'Excelente' ? 'default' : 
                          item.status === 'Buena' ? 'outline' : 'destructive'
                        }>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Stock por Categoría</CardTitle>
                <CardDescription>Distribución del inventario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <PieChart className="w-8 h-8 mr-2" />
                  Gráfico circular - Stock por categoría
                  <br />
                  (Se implementará con Chart.js)
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valor del Inventario</CardTitle>
                <CardDescription>Evolución del valor total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <BarChart3 className="w-8 h-8 mr-2" />
                  Gráfico de área - Valor del inventario
                  <br />
                  (Se implementará con Chart.js)
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sales Reports */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Categoría</CardTitle>
                <CardDescription>
                  Ventas, ingresos y rentabilidad por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-center">Ventas</TableHead>
                      <TableHead className="text-right">Ingresos</TableHead>
                      <TableHead className="text-right">Margen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryPerformance.map((category, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{category.category}</TableCell>
                        <TableCell className="text-center font-mono">{category.sales}</TableCell>
                        <TableCell className="text-right font-mono">${category.revenue.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="text-success border-success">
                            {category.margin.toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Productos Más Vendidos</CardTitle>
                <CardDescription>
                  Top 5 productos por volumen de ventas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-center">Ventas</TableHead>
                      <TableHead className="text-right">Ingresos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-center font-mono">{product.sales}</TableCell>
                        <TableCell className="text-right font-mono">${product.revenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Ventas</CardTitle>
              <CardDescription>Análisis temporal de ventas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                Gráfico combinado - Ventas por día/semana/mes
                <br />
                (Se implementará con Chart.js)
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Balance Sheet */}
        <TabsContent value="balance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Activos</CardTitle>
                <CardDescription>Total: ${totalAssets.toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">{asset.item}</div>
                        <div className="text-sm text-muted-foreground">{asset.type}</div>
                      </div>
                      <div className="font-mono font-bold">${asset.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pasivos</CardTitle>
                <CardDescription>Total: ${totalLiabilities.toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liabilities.map((liability, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">{liability.item}</div>
                        <div className="text-sm text-muted-foreground">{liability.type}</div>
                      </div>
                      <div className="font-mono font-bold text-danger">${liability.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patrimonio</CardTitle>
                <CardDescription>Capital propio de la empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="text-sm text-success-foreground">Patrimonio Total</div>
                    <div className="text-2xl font-bold text-success">${equity.toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Activos:</span>
                      <span>${totalAssets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pasivos:</span>
                      <span>-${totalLiabilities.toLocaleString()}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Patrimonio:</span>
                      <span>${equity.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Evolución del Patrimonio</CardTitle>
              <CardDescription>Cambios en el patrimonio a lo largo del tiempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                Gráfico de líneas - Evolución del patrimonio
                <br />
                (Se implementará con Chart.js)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}