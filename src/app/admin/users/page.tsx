"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Users, UserPlus, Search, Edit2, Trash2, Shield, MoreHorizontal } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: "1", name: "System Admin", email: "admin@example.com", role: "ADMIN", status: "ACTIVE" },
    { id: "2", name: "Manager Approval", email: "manager@example.com", role: "MANAGER", status: "ACTIVE" },
    { id: "3", name: "Staff User", email: "user@example.com", role: "USER", status: "ACTIVE" },
  ]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Manajemen User</h1>
            <p className="text-slate-500">Kelola akses dan peran pengguna sistem.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-xl font-bold gap-2 shadow-lg shadow-blue-100">
            <UserPlus className="w-5 h-5" />
            Tambah User
          </Button>
        </header>

        <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-slate-100 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                <Input
                  placeholder="Cari user berdasarkan nama atau email..."
                  className="pl-10 h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Nama & Email</TableHead>
                  <TableHead className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</TableHead>
                  <TableHead className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</TableHead>
                  <TableHead className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="px-8 py-5">
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5">
                      <Badge variant="outline" className={`gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                        user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        user.role === 'MANAGER' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-slate-50 text-slate-700 border-slate-100'
                      }`}>
                        <Shield className="w-3.5 h-3.5" />
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        {user.status}
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50">
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
      </main>
    </div>
  );
}
