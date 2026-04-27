"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { FileText, Download, Eye, ExternalLink } from "lucide-react";

export default function ArchivePage() {
  const archives = [
    { id: "1", title: "Internal Memo - Libur Nasional", date: "25 Apr 2026", status: "APPROVED" },
    { id: "2", title: "FPTK Asisten Trainer - Jhon Doe", date: "20 Apr 2026", status: "APPROVED" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Arsip Dokumen</h1>
          <p className="text-slate-500">Daftar dokumen yang telah selesai diproses.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archives.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <FileText className="text-blue-600 w-6 h-6" />
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                  {item.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
              <p className="text-xs text-slate-500 mb-6">Disetujui pada {item.date}</p>
              
              <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold hover:bg-blue-50 hover:text-blue-700 transition-all">
                  <Eye className="w-4 h-4" />
                  Lihat
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                  <Download className="w-4 h-4" />
                  Unduh
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
