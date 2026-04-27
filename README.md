# E-Document Generator (POC)

Sistem Generator Dokumen berbasis Next.js, Prisma, dan Shadcn UI. Proyek ini dirancang untuk mendigitalkan proses pembuatan, persetujuan (approval), dan pengarsipan dokumen perusahaan.

## Fitur Utama
- **Template HTML**: Menggunakan file HTML murni untuk layout dokumen yang presisi dan mudah disesuaikan.
- **Sistem Approval**: Alur kerja dari pengajuan oleh Staff hingga persetujuan oleh Manager.
- **Tanda Tangan Digital**: Penempelan gambar tanda tangan otomatis pada dokumen yang disetujui.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Manajemen user dan sistem.
  - **Manager**: Approval dan monitoring dokumen.
  - **User/Staff**: Pembuatan dokumen dan pelacakan status.
- **Modern UI**: Antarmuka premium menggunakan Shadcn UI dan Tailwind CSS.

## Tech Stack
- **Framework**: [Next.js 14](https://nextjs.org/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Database**: SQLite (via [Prisma](https://www.prisma.io/))
- **Icons**: [Lucide React](https://lucide.dev/)

## Persiapan Lokal
1.  Instal dependensi:
    ```bash
    npm install
    ```
2.  Setup Database & Seed Data:
    ```bash
    npx prisma db push
    npx ts-node prisma/seed.ts
    ```
3.  Jalankan server:
    ```bash
    npm run dev
    ```

## Akun Demo
| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | admin@example.com | admin123 |
| **Manager** | manager@example.com | manager123 |
| **Staff** | user@example.com | user123 |

## Deployment ke Vercel
Untuk deploy ke Vercel, pastikan:
1.  Gunakan database eksternal (seperti Turso atau Supabase) karena SQLite file bersifat ephemeral (hilang setelah redeploy).
2.  Set `DATABASE_URL` di Environment Variables Vercel.
3.  Jalankan `npx prisma generate` di build command.