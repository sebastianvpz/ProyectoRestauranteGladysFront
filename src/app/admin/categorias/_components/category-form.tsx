"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/modules/categories/server";
import { createCategoryAction, updateCategoryAction } from "@/modules/categories/actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CategoryForm({ initialData }: { initialData?: Category }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    estado: initialData?.estado || "Activo",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert("El nombre es requerido");
      return;
    }

    setLoading(true);
    let result;
    if (initialData) {
      result = await updateCategoryAction(initialData.idCategoria, formData);
    } else {
      result = await createCategoryAction(formData);
    }
    setLoading(false);

    if (result.ok) {
      router.push("/admin/categorias");
      router.refresh();
    } else {
      alert(result.error || "Error al guardar la categoría");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div className="bg-white p-6 rounded-2xl border border-[#D4A853]/20 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#2D2013] mb-1">Nombre</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#C75D3A]"
            placeholder="Ej. Entradas"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#2D2013] mb-1">Estado</label>
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#C75D3A] bg-white"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Guardar
        </Button>
      </div>
    </form>
  );
}
