"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";

type ReportResponse = {
  etiquetas: string[];
  valores: number[];
  pedidos: any[];
};

export function SalesChart({ token }: { token: string }) {
  const [data, setData] = useState<{ date: string; total: number }[]>([]);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Opcionales filtros
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      let query = "";
      if (fechaInicio) query += `?fechaInicio=${fechaInicio}`;
      if (fechaFin) query += `${query ? "&" : "?"}fechaFin=${fechaFin}`;

      const response = await fetch(`http://localhost:8080/api/admin/reportes/ventas${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const res: ReportResponse = await response.json();
      const chartData = res.etiquetas.map((label, index) => ({
        date: label,
        total: res.valores[index],
      }));
      setData(chartData);
      setPedidos(res.pedidos);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(pedidos.map(p => ({
      ID: p.idPedido,
      Cliente: p.cliente?.nombre || "N/A",
      Celular: p.cliente?.celular || "N/A",
      Fecha: p.fechaHora,
      Estado: p.estado,
      Total: p.total
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, "Reporte_Ventas.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Ventas - Restaurante Gladys", 14, 15);
    
    const tableColumn = ["ID", "Cliente", "Celular", "Fecha", "Estado", "Total"];
    const tableRows = pedidos.map(p => [
      p.idPedido,
      p.cliente?.nombre || "N/A",
      p.cliente?.celular || "N/A",
      new Date(p.fechaHora).toLocaleDateString(),
      p.estado,
      formatPrice(p.total)
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    
    doc.save("Reporte_Ventas.pdf");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Desde</label>
          <input 
            type="date" 
            value={fechaInicio} 
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#C75D3A]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Hasta</label>
          <input 
            type="date" 
            value={fechaFin} 
            onChange={(e) => setFechaFin(e.target.value)}
            className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#C75D3A]"
          />
        </div>
        <button 
          onClick={fetchData}
          className="bg-[#2D2013] text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-[#C75D3A] transition-colors"
        >
          Filtrar
        </button>
        
        <div className="flex-1"></div>
        
        <div className="flex gap-2">
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded text-sm font-semibold hover:bg-green-700 transition-colors"
            disabled={pedidos.length === 0}
          >
            <Download className="w-4 h-4" /> Excel
          </button>
          <button 
            onClick={exportToPDF}
            className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded text-sm font-semibold hover:bg-red-700 transition-colors"
            disabled={pedidos.length === 0}
          >
            <Download className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      <div className="h-[400px] w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        {loading ? (
          <div className="h-full flex items-center justify-center text-gray-400">Cargando gráfico...</div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">No hay datos de ventas en este rango de fechas.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickMargin={10} />
              <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `S/${value}`} />
              <Tooltip 
                formatter={(value: any) => [formatPrice(Number(value) || 0), "Ventas"]}
                labelStyle={{ color: '#2D2013', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#C75D3A" 
                strokeWidth={3}
                activeDot={{ r: 8, fill: '#C75D3A', stroke: '#fff', strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
