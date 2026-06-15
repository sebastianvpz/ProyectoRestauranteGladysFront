"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, setAdminSession } from "./session";

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Ingresa email y contraseña." };
  }

  try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { error: "Credenciales incorrectas." };
    }

    const data = await res.json();
    // data.token y data.rol vienen de Spring Boot
    await setAdminSession(email, data.rol, data.token);
    
  } catch (error) {
    return { error: "Error conectando al servidor." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
