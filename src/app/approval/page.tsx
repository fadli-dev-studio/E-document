"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { FileText, CheckCircle, XCircle, Eye, Search } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ApprovalPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const approvals = [
    { id: "1", title: "FPTK Asisten Trainer - Jhon Doe", user: "Staff User", date: "27 Apr 2026", type: "FPTK" },
    { id: "2", title: "Internal Memo - Libur Nasional", user: "Admin HR", date: "26 Apr 2026", type: "MEMO" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Daftar Approval</h1>
            <p className="text-slate-500">Tinjau dan setujui dokumen yang diajukan.</p>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
            <Input
              type="text"
              placeholder="Cari dokumen..."
              className="pl-10 pr-4 py-2 h-10 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none w-64 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Dokumen</TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Pengaju</TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Tanggal</TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvals.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="text-blue-600 w-5 h-5" />
                        </div>
                        <span className="font-semibold text-slate-900">{item.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-slate-600">{item.user}</TableCell>
                    <TableCell className="px-6 py-4 text-slate-500 text-sm">{item.date}</TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                          <Eye className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 h-9 font-bold gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 h-9 font-bold gap-2">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {approvals.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                Tidak ada dokumen yang menunggu approval.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
