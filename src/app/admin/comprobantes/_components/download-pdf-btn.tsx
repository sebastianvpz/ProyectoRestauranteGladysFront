"use client";

import { FileText } from "lucide-react";

export function DownloadPdfBtn({ idPedido, token }: { idPedido: number; token: string }) {
  const handleDownload = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/pedidos/${idPedido}/factura/pdf`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        alert("Error al descargar el PDF");
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `comprobante_${idPedido}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Error en la conexión");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
    >
      <FileText className="h-3.5 w-3.5" /> PDF
    </button>
  );
}
