// src/layout/MainLayout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AppBar from '@/components/AppBar'
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <AppBar>
          <SidebarTrigger />
        </AppBar>

        {/* This renders the current route's content */}
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
