"use client";

import { useTransition } from "react";
import { deleteDishAction } from "../_lib/actions";

type DeleteDishButtonProps = {
  id: string;
  name: string;
};

export function DeleteDishButton({ id, name }: DeleteDishButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
        startTransition(async () => {
          await deleteDishAction(id);
        });
      }}
      className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
    >
      {isPending ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
