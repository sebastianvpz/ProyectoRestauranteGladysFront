"use client";

import { useState, useEffect } from "react";
import { Download, FileArchive } from "lucide-react";

export function ExportZipForm({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);
  const [meses, setMeses] = useState<string[]>([]);
  const [mes, setMes] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/reportes/comprobantes/meses", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setMeses(data);
        if (data.length > 0) setMes(data[0]);
      })
      .catch(console.error);
  }, [token]);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mes) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/admin/reportes/comprobantes/zip?mes=${mes}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        alert("Error al descargar el archivo ZIP.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `comprobantes_${mes}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar descargar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleDownload} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#2D2013]">Mes de Declaración</label>
        {meses.length === 0 ? (
          <p className="text-xs text-[#8B7355]">Cargando meses disponibles o no hay facturas emitidas...</p>
        ) : (
          <select
            required
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="w-full rounded-xl border border-[#D4A853]/30 bg-white px-4 py-2 text-sm outline-none focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20"
          >
            {meses.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !mes}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100 disabled:opacity-50"
      >
        {loading ? (
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          <FileArchive className="h-4 w-4" />
        )}
        Descargar ZIP de Facturas
      </button>
    </form>
  );
}
