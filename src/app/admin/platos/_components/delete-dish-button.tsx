"use client";

import { deleteDishAction } from "../_lib/actions";
import { useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

type DeleteDishButtonProps = {
  id: string;
  name: string;
};

export function DeleteDishButton({ id, name }: DeleteDishButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(false);
    startTransition(async () => {
      await deleteDishAction(id);
    });
  };

  return (
    <>
      <button
        type="button"
        disabled={isPending}
        onClick={() => setShowConfirm(true)}
        className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
      >
        {isPending ? "Eliminando..." : "Eliminar"}
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Eliminar Plato"
        message={`¿Eliminar "${name}"? Esta acción no se puede deshacer.`}
        type="danger"
        confirmText="Sí, eliminar"
      />
    </>
  );
}
