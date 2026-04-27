"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { FileText, Send, ChevronRight, XCircle } from "lucide-react";

const templates = [
  { 
    id: "template-fptk", 
    name: "FPTK ASISTEN TRAINER", 
    description: "Form Permintaan Tenaga Kerja",
    fields: [
      { name: "Posisi", label: "Posisi", type: "text", placeholder: "Contoh: Asisten Trainer" },
      { name: "Penempatan", label: "Penempatan", type: "text", placeholder: "Contoh: Area Site Mandiodo" },
      { name: "GajiMin", label: "Gaji Minimum", type: "number", placeholder: "0" },
      { name: "GajiMax", label: "Gaji Maksimum", type: "number", placeholder: "0" },
      { name: "MenggantiKaryawan", label: "Mengganti Karyawan", type: "text", placeholder: "Nama karyawan yang diganti" },
      { name: "PenambahanKaryawan", label: "Penambahan Karyawan", type: "text", placeholder: "Alasan penambahan" },
      { name: "SumberRecruitment", label: "Sumber Recruitment", type: "text", placeholder: "Contoh: Non-Lokal" },
      { name: "StatusKepegawaian", label: "Status Kepegawaian", type: "text", placeholder: "Contoh: Staff" },
      { name: "JumlahPermintaan", label: "Jumlah Permintaan", type: "number", placeholder: "1" },
      { name: "JangkaWaktuPencarian", label: "Jangka Waktu Pencarian", type: "text", placeholder: "Contoh: Urgently" },
      { name: "TargetTanggal", label: "Target Tanggal", type: "text", placeholder: "Contoh: 25 April 2026" },
      { name: "UraianTugas", label: "Uraian Tugas", type: "textarea", placeholder: "Sebutkan tugas utama..." },
      { name: "Pendidikan", label: "Pendidikan Minimal", type: "text", placeholder: "Contoh: SMA/SMK" },
      { name: "Usia", label: "Usia", type: "text", placeholder: "Contoh: 30-40 Tahun" },
      { name: "JenisKelamin", label: "Jenis Kelamin", type: "text", placeholder: "Laki-Laki / Perempuan" },
      { name: "Pengalaman", label: "Pengalaman Bekerja", type: "text", placeholder: "Contoh: 1-3 Tahun" },
      { name: "Bahasa", label: "Kemampuan Bahasa", type: "text", placeholder: "Contoh: Indonesia" },
      { name: "NamaStaff", label: "Nama Pengaju", type: "text", placeholder: "Nama Anda" },
      { name: "JabatanStaff", label: "Jabatan Pengaju", type: "text", placeholder: "Jabatan Anda" },
    ]
  },
  { 
    id: "template-memo", 
    name: "Internal Memo - Libur Nasional", 
    description: "Memo Pengumuman Libur",
    fields: [
      { name: "NomorMemo", label: "Nomor Memo", type: "text" },
      { name: "Perihal", label: "Perihal", type: "text" },
      { name: "IsiMemo", label: "Isi Memo", type: "textarea" },
      { name: "NamaStaff", label: "Nama Pengaju", type: "text" },
    ]
  },
];

export default function CreateDocument() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
    setFormData({}); // Reset form
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const handlePreview = async () => {
    if (!selectedTemplate) return;
    const templateName = selectedTemplate === "template-fptk" ? "fptk" : "memo";
    const res = await fetch("/api/documents/preview", {
      method: "POST",
      body: JSON.stringify({ template: templateName, data: formData }),
    });
    if (res.ok) {
      const html = await res.text();
      setPreviewHtml(html);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In real app, call API to save
    setTimeout(() => {
      alert("Request Approval Berhasil Dikirim!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Buat Dokumen</h1>
          <p className="text-slate-500">Pilih template dan isi data yang diperlukan.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-bold text-slate-700 uppercase text-xs tracking-wider mb-4">Pilih Template</h2>
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTemplateSelect(t.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  selectedTemplate === t.id
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-white border-slate-200 text-slate-900 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${selectedTemplate === t.id ? "text-blue-100" : "text-blue-500"}`} />
                    <div>
                      <p className="font-bold text-sm leading-tight">{t.name}</p>
                      <p className={`text-xs ${selectedTemplate === t.id ? "text-blue-100" : "text-slate-500"}`}>{t.description}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${selectedTemplate === t.id ? "text-blue-100" : "text-slate-300"}`} />
                </div>
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {currentTemplate ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <FileText className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-slate-900">Isi Data Dokumen</h2>
                    <p className="text-sm text-slate-500">{currentTemplate.name}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentTemplate.fields.map((field) => (
                      <div key={field.name} className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                        <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder={field.placeholder}
                            required
                          ></textarea>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder={field.placeholder}
                            required
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={handlePreview}
                      className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                    >
                      Preview HTML
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? "Mengirim..." : "Kirim Request Approval"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                <FileText className="w-12 h-12 mb-4 opacity-20" />
                <p>Pilih template di sebelah kiri untuk mulai mengisi</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Modal */}
        {previewHtml && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
            <div className="bg-white w-full max-w-4xl max-h-full rounded-3xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="font-bold text-xl">Preview Dokumen</h2>
                <button 
                  onClick={() => setPreviewHtml(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <XCircle className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-8 bg-slate-100">
                <div className="bg-white shadow-lg mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                  <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 text-right">
                <button 
                  onClick={() => setPreviewHtml(null)}
                  className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
