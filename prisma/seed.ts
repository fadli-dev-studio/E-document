const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: { password: "user123" },
    create: {
      email: "user@example.com",
      name: "Staff User",
      role: "USER",
      password: "user123",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { password: "admin123" },
    create: {
      email: "admin@example.com",
      name: "System Admin",
      role: "ADMIN",
      password: "admin123",
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: "manager@example.com" },
    update: { password: "manager123" },
    create: {
      email: "manager@example.com",
      name: "Manager Approval",
      role: "MANAGER",
      password: "manager123",
      signatureImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", // Mock signature
    },
  });

  // Create Templates
  await prisma.template.upsert({
    where: { id: "template-fptk" },
    update: {
      name: "FPTK ASISTEN TRAINER",
      filePath: "templates/fptk.html",
    },
    create: {
      id: "template-fptk",
      name: "FPTK ASISTEN TRAINER",
      description: "Form Permintaan Tenaga Kerja untuk Asisten Trainer",
      filePath: "templates/fptk.html",
      config: JSON.stringify({
        fields: ["Posisi", "Penempatan", "GajiMin", "GajiMax", "MenggantiKaryawan", "PenambahanKaryawan", "SumberRecruitment", "StatusKepegawaian", "JumlahPermintaan", "ManpowerSaatIni", "JangkaWaktuPencarian", "TargetTanggal", "UraianTugas", "Pendidikan", "Usia", "JenisKelamin", "Pengalaman", "Bahasa", "NamaStaff", "JabatanStaff"]
      }),
    },
  });

  console.log({ user, manager });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
