import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  XCircle,
  ShoppingCart,
  DollarSign,
  Users,
  Activity
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data
const dashboardStats = {
  totalProducts: 1247,
  totalStock: 8934,
  lowStock: 23,
  outOfStock: 5,
  todaySales: 156,
  monthlyRevenue: 45600,
  activeUsers: 12,
  pendingOrders: 8
}

const lowStockProducts = [
  { id: 1, code: "CAM001", name: "Camiseta Basic Blanca", category: "Camisetas", stock: 3, minStock: 10, size: "M", color: "Blanco" },
  { id: 2, code: "PAN002", name: "Pantalón Skinny Negro", category: "Pantalones", stock: 5, minStock: 15, size: "32", color: "Negro" },
  { id: 3, code: "VES003", name: "Vestido Floral Verano", category: "Vestidos", stock: 2, minStock: 8, size: "S", color: "Multicolor" },
  { id: 4, code: "ZAP004", name: "Zapatillas Running", category: "Calzado", stock: 1, minStock: 6, size: "40", color: "Azul" },
  { id: 5, code: "ACC005", name: "Gorra Deportiva", category: "Accesorios", stock: 4, minStock: 12, size: "UNI", color: "Rojo" },
]

const recentMovements = [
  { type: "Entrada", product: "Camiseta Premium", quantity: 50, reason: "Compra" },
  { type: "Salida", product: "Pantalón Denim", quantity: 12, reason: "Venta" },
  { type: "Entrada", product: "Vestido Elegante", quantity: 30, reason: "Compra" },
  { type: "Salida", product: "Zapatillas Sport", quantity: 8, reason: "Venta" },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Panel</h1>
        <p className="text-muted-foreground">
          Resumen general de tu inventario Ceferino Kids
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardStats.totalProducts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% respecto al mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{dashboardStats.totalStock.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +5% respecto al mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{dashboardStats.lowStock}</div>
            <p className="text-xs text-muted-foreground">
              Productos por debajo del mínimo
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sin Stock</CardTitle>
            <XCircle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{dashboardStats.outOfStock}</div>
            <p className="text-xs text-muted-foreground">
              Productos agotados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
            <ShoppingCart className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{dashboardStats.todaySales}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">${dashboardStats.monthlyRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{dashboardStats.activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Pendientes</CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{dashboardStats.pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolución de Ventas</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              Gráfico de ventas
              <br />
              (Se implementará con Chart.js)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock por Categoría</CardTitle>
            <CardDescription>Distribución actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              Gráfico circular
              <br />
              (Se implementará con Chart.js)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Low Stock Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Productos con Stock Bajo
              <Badge variant="outline" className="text-warning border-warning">
                {lowStockProducts.length}
              </Badge>
            </CardTitle>
            <CardDescription>
              Productos que requieren reposición
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.code} • {product.size} • {product.color}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-warning border-warning">
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button size="sm" variant="outline">
                        Reponer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Movements */}
        <Card>
          <CardHeader>
            <CardTitle>Movimientos Recientes</CardTitle>
            <CardDescription>
              Últimas actividades del inventario
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.map((movement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50">
                  <div className={`w-2 h-8 rounded-full ${
                    movement.type === 'Entrada' ? 'bg-success' : 'bg-info'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium">{movement.product}</div>
                    <div className="text-sm text-muted-foreground">
                      {movement.type} • {movement.quantity} unidades • {movement.reason}
                    </div>
                  </div>
                  <Badge variant={movement.type === 'Entrada' ? 'default' : 'secondary'}>
                    {movement.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}