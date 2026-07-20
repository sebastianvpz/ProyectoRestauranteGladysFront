"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { disableCategoryAction } from "@/modules/categories/actions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function DeleteCategoryButton({ id, name }: { id: number; name: string }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setShowConfirm(false);
    setLoading(true);
    const result = await disableCategoryAction(id);
    setLoading(false);

    if (result.ok) {
      router.refresh();
    } else {
      alert(result.error || "Error al desactivar la categoría");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        title="Desactivar"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Desactivar Categoría"
        message={`¿Estás seguro que deseas desactivar la categoría "${name}"?`}
        type="danger"
        confirmText="Sí, desactivar"
      />
    </>
  );
}
