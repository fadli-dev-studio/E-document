"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FilePlus, 
  CheckSquare, 
  Settings, 
  LogOut,
  FileText,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: FilePlus, label: "Buat Dokumen", href: "/create" },
  { icon: CheckSquare, label: "Approval", href: "/approval" },
  { icon: Users, label: "Manajemen User", href: "/admin/users" },
  { icon: FileText, label: "Arsip", href: "/archive" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">E-Doc</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                pathname === item.href 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                pathname === item.href ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
