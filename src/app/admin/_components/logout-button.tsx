"use client";

import { logoutAction } from "../_lib/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
        Salir
      </Button>
    </form>
  );
}
