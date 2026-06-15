import { redirect } from "next/navigation";
import { getAdminSession } from "../_lib/session";
import { LoginForm } from "./_components/login-form";

export const metadata = { title: "Iniciar sesión" };

export default async function LoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-semibold text-[#2D2013]">Acceso administrador</h1>
          <p className="mt-2 text-sm text-[#8B7355]">
            Ingresa tus credenciales para gestionar el restaurante.
          </p>
        </div>
        <div className="rounded-2xl border border-[#D4A853]/20 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
