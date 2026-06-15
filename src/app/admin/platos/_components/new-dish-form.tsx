"use client";

import { useActionState } from "react";
import { DishForm } from "./dish-form";
import { createDishAction } from "../_lib/actions";

export function NewDishForm() {
  const [state, formAction, isPending] = useActionState(createDishAction, null);

  return (
    <div className="space-y-4">
      {state?.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      <div className={isPending ? "pointer-events-none opacity-60" : ""}>
        <DishForm action={formAction} submitLabel={isPending ? "Guardando..." : "Crear plato"} />
      </div>
    </div>
  );
}
