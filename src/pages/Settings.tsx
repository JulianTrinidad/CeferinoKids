import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  Settings,
  Palette,
  Globe,
  DollarSign,
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  Bell,
  User,
  Shield,
  Mail
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [theme, setTheme] = useState("default")
  const [language, setLanguage] = useState("es")
  const [currency, setCurrency] = useState("MXN")
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)
  const [lowStockAlert, setLowStockAlert] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)

  const themes = [
    { value: "default", label: "Predeterminado", color: "bg-primary" },
    { value: "dark", label: "Oscuro", color: "bg-dark" },
    { value: "blue", label: "Azul", color: "bg-info" }
  ]

  const languages = [
    { value: "es", label: "Español (ES)", flag: "🇪🇸" },
    { value: "en", label: "English (EN)", flag: "🇺🇸" },
    { value: "pt", label: "Português (PT)", flag: "🇧🇷" }
  ]

  const currencies = [
    { value: "MXN", label: "Peso Mexicano (MXN)", symbol: "$" },
    { value: "USD", label: "Dólar Americano (USD)", symbol: "$" },
    { value: "EUR", label: "Euro (EUR)", symbol: "€" }
  ]

  const handleSaveSettings = () => {
    // Logic to save settings
    console.log("Settings saved:", { theme, language, currency, notifications, autoBackup })
    alert("Configuración guardada exitosamente")
  }

  const handleExportData = () => {
    // Logic to export data
    console.log("Exporting data...")
    alert("Exportación iniciada. Recibirás un email cuando esté lista.")
  }

  const handleImportData = () => {
    // Logic to import data
    console.log("Importing data...")
    alert("Selecciona el archivo de respaldo para importar")
  }

  const handleClearData = () => {
    // Logic to clear all data
    console.log("Clearing all data...")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground">
          Personaliza StyleStock según tus preferencias y necesidades
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="localization">Localización</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="data">Datos</TabsTrigger>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
        </TabsList>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Tema de Colores
              </CardTitle>
              <CardDescription>
                Selecciona el tema visual que más te guste
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {themes.map((themeOption) => (
                  <div
                    key={themeOption.value}
                    className={`relative cursor-pointer rounded-lg border p-4 hover:border-primary ${
                      theme === themeOption.value ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setTheme(themeOption.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full ${themeOption.color}`} />
                      <div>
                        <div className="font-medium">{themeOption.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {themeOption.value === 'default' && 'Colores claros y vibrantes'}
                          {themeOption.value === 'dark' && 'Tema oscuro para uso nocturno'}
                          {themeOption.value === 'blue' && 'Tonos azules corporativos'}
                        </div>
                      </div>
                    </div>
                    {theme === themeOption.value && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-primary-foreground">Activo</Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
              <CardDescription>
                Así se verá StyleStock con el tema seleccionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">StyleStock Dashboard</h3>
                  <Badge className="bg-primary text-primary-foreground">Vista Previa</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="text-sm text-primary">Total Productos</div>
                    <div className="text-xl font-bold text-primary">1,247</div>
                  </div>
                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="text-sm text-success">En Stock</div>
                    <div className="text-xl font-bold text-success">1,219</div>
                  </div>
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <div className="text-sm text-warning">Stock Bajo</div>
                    <div className="text-xl font-bold text-warning">23</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Localization Settings */}
        <TabsContent value="localization" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Idioma
                </CardTitle>
                <CardDescription>
                  Selecciona el idioma de la interfaz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {languages.map((lang) => (
                  <div
                    key={lang.value}
                    className={`cursor-pointer rounded-lg border p-3 hover:border-primary ${
                      language === lang.value ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setLanguage(lang.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <div className="font-medium">{lang.label}</div>
                      </div>
                      {language === lang.value && (
                        <Badge className="ml-auto bg-primary text-primary-foreground">Activo</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Moneda
                </CardTitle>
                <CardDescription>
                  Configura la moneda para precios y reportes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currencies.map((curr) => (
                  <div
                    key={curr.value}
                    className={`cursor-pointer rounded-lg border p-3 hover:border-primary ${
                      currency === curr.value ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setCurrency(curr.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center font-bold">
                        {curr.symbol}
                      </div>
                      <div>
                        <div className="font-medium">{curr.label}</div>
                      </div>
                      {currency === curr.value && (
                        <Badge className="ml-auto bg-primary text-primary-foreground">Activo</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configuración de Notificaciones
              </CardTitle>
              <CardDescription>
                Controla qué notificaciones deseas recibir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificaciones del Sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibir notificaciones generales de la aplicación
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Alertas de Stock Bajo</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar cuando los productos estén por debajo del stock mínimo
                  </p>
                </div>
                <Switch
                  checked={lowStockAlert}
                  onCheckedChange={setLowStockAlert}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar resúmenes diarios y alertas importantes por correo
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              {emailNotifications && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" type="email" placeholder="admin@stylestock.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="frequency">Frecuencia de Reportes</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diario</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="monthly">Mensual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Gestión de Datos
                </CardTitle>
                <CardDescription>
                  Administra los datos de tu inventario y configuración
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Respaldo Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Crear respaldos automáticos cada 24 horas
                    </p>
                  </div>
                  <Switch
                    checked={autoBackup}
                    onCheckedChange={setAutoBackup}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Respaldo y Restauración</CardTitle>
                <CardDescription>
                  Exporta o importa todos los datos de StyleStock
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button
                    variant="outline"
                    onClick={handleExportData}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Datos
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleImportData}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Importar Datos
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Los datos se exportan en formato JSON con toda la información de productos, 
                  movimientos y configuración.
                </p>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Zona Peligrosa</CardTitle>
                <CardDescription>
                  Acciones irreversibles que eliminarán datos permanentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full md:w-auto">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar Todos los Datos
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente 
                        todos los productos, movimientos, reportes y configuración de StyleStock.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={handleClearData}
                      >
                        Sí, eliminar todo
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información de la Cuenta
              </CardTitle>
              <CardDescription>
                Administra tu información personal y de acceso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuario</Label>
                  <Input id="username" defaultValue="admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-account">Correo Electrónico</Label>
                  <Input id="email-account" type="email" defaultValue="admin@stylestock.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstname">Nombre</Label>
                  <Input id="firstname" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Apellido</Label>
                  <Input id="lastname" placeholder="Tu apellido" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Seguridad
              </CardTitle>
              <CardDescription>
                Configura la seguridad de tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button variant="outline">
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}