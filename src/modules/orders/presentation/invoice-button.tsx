"use client";

import { useState } from "react";
import { Download, Receipt } from "lucide-react";

export function InvoiceButton({ orderId, isPaid, token }: { orderId: string; isPaid: boolean; token: string }) {
  const [loading, setLoading] = useState(false);

  if (!isPaid) return null; // Solo se puede facturar pedidos pagados

  const handleDownload = async () => {
    setLoading(true);
    try {
      // 1. Intentar generar comprobante por si no existe
      await fetch(`http://localhost:8080/api/admin/pedidos/${orderId}/facturar?tipo=BOLETA`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2. Descargar PDF
      const response = await fetch(`http://localhost:8080/api/admin/pedidos/${orderId}/factura/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        alert("Error al descargar la factura");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `comprobante_${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al descargar el PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-2 rounded-full border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100 disabled:opacity-50"
    >
      {loading ? (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        <Receipt className="h-4 w-4" />
      )}
      Descargar Boleta
    </button>
  );
}
