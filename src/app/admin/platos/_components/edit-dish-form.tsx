"use client";

import { useActionState } from "react";
import { DishForm } from "./dish-form";
import { updateDishAction } from "../_lib/actions";
import type { Dish } from "@/modules/dishes";

type EditDishFormProps = {
  dish: Dish;
};

export function EditDishForm({ dish }: EditDishFormProps) {
  const boundAction = updateDishAction.bind(null, dish.id);
  const [state, formAction, isPending] = useActionState(boundAction, null);

  return (
    <div className="space-y-4">
      {state?.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      <fieldset disabled={isPending} className={isPending ? "opacity-60" : ""}>
        <DishForm
          action={formAction}
          defaults={dish}
          submitLabel={isPending ? "Guardando..." : "Guardar cambios"}
        />
      </fieldset>
    </div>
  );
}
