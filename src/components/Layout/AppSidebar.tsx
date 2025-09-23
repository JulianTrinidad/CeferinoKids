import { useState } from "react"
import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  ArrowUpDown, 
  BarChart3, 
  QrCode, 
  Settings,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navigationItems = [
  { title: "Inicio", url: "/", icon: LayoutDashboard },
  { title: "Productos", url: "/products", icon: Package },
  { title: "Gestión de Stock", url: "/stock", icon: Warehouse },
  { title: "Movimientos", url: "/movements", icon: ArrowUpDown },
  { title: "Reportes", url: "/reports", icon: BarChart3 },
  { title: "Generador QR", url: "/qr-generator", icon: QrCode },
  { title: "Configuración", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(path)
  }

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        {/* Logo Section */}
        <div className="flex items-center justify-center h-16 border-b border-border bg-primary">
          <div className="flex items-center space-x-2">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-primary-foreground">Ceferino Kids</h1>
            )}
            {isCollapsed && (
              <span className="text-xl font-bold text-primary-foreground">SS</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-xs uppercase tracking-wider", isCollapsed && "sr-only")}>
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.url)}
                    className={cn(
                      "w-full justify-start transition-colors",
                      isActive(item.url) && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    <NavLink to={item.url} className="flex items-center">
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}