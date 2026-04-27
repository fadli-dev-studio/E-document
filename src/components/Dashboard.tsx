"use client";

import React from "react";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsProps {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}

export function DashboardStats({ total, approved, pending, rejected }: StatsProps) {
  const stats = [
    { label: "Total Dokumen", value: total, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Disetujui", value: approved, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Menunggu", value: pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Ditolak", value: rejected, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{stat.label}</CardTitle>
            <div className={`${stat.bg} p-2 rounded-lg`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
