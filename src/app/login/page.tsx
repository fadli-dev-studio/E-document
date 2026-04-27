"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Lock, Mail, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl shadow-xl shadow-slate-200 border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <FileText className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">E-Document System</CardTitle>
          <CardDescription className="text-blue-100 mt-1">Silakan masuk ke akun Anda</CardDescription>
        </div>

        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                <Input
                  type="email"
                  className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                <Input
                  type="password"
                  className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white h-12 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk"}
            </Button>
            
            <div className="text-center space-y-2 mt-4 pt-4 border-t border-slate-50">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Akun Demo</p>
              <div className="flex flex-wrap justify-center gap-2 text-[10px] text-slate-500">
                <span className="bg-slate-100 px-2 py-0.5 rounded">Admin: admin@example.com / admin123</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">Manager: manager@example.com / manager123</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">User: user@example.com / user123</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
