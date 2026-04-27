import { Sidebar } from "@/components/Sidebar";
import { DashboardStats } from "@/components/Dashboard";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default function Home() {
  // Mock data for now since DB might not be ready
  const stats = {
    total: 12,
    approved: 8,
    pending: 3,
    rejected: 1,
  };

  const recentDocuments = [
    { id: "1", title: "FPTK Asisten Trainer - Jhon Doe", status: "PENDING", date: "27 Apr 2026" },
    { id: "2", title: "Internal Memo - Libur Nasional", status: "APPROVED", date: "25 Apr 2026" },
    { id: "3", title: "FPTK Asisten Trainer - Jane Doe", status: "REJECTED", date: "24 Apr 2026" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-500">Selamat datang kembali, Staff User.</p>
        </header>

        <DashboardStats {...stats} />

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-lg text-slate-900">Dokumen Terbaru</h2>
            <button className="text-blue-600 text-sm font-semibold hover:underline">Lihat Semua</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{doc.title}</h3>
                    <p className="text-xs text-slate-500">{doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={doc.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    APPROVED: "bg-green-50 text-green-700 border-green-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
  };

  const statusIcons: Record<string, any> = {
    PENDING: Clock,
    APPROVED: CheckCircle,
    REJECTED: XCircle,
  };

  const style = statusStyles[status] || "bg-slate-50 text-slate-700 border-slate-200";
  const Icon = statusIcons[status] || FileText;

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${style}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}
