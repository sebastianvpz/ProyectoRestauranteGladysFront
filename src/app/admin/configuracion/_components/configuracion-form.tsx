"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

type Config = {
  horaApertura: string;
  horaCierre: string;
  localAbierto: boolean;
};

export function ConfiguracionForm({ token, initialConfig }: { token: string; initialConfig: Config }) {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<Config>(initialConfig);
  const [alertInfo, setAlertInfo] = useState<{show: boolean, msg: string, type: "success" | "warning" | "danger"}>({show: false, msg: "", type: "warning"});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/admin/configuracion", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setAlertInfo({show: true, msg: "Configuración actualizada correctamente", type: "success"});
      } else {
        setAlertInfo({show: true, msg: "Error al actualizar la configuración", type: "danger"});
      }
    } catch (error) {
      console.error(error);
      setAlertInfo({show: true, msg: "Error de red", type: "danger"});
    } finally {
      setLoading(false);
    }
  };

  // Convert "10:00:00" to "10:00" for input type="time"
  const timeToString = (timeStr: string) => timeStr.substring(0, 5);
  // Convert "10:00" back to "10:00:00"
  const stringToTime = (str: string) => str.length === 5 ? `${str}:00` : str;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-[#D4A853]/20 bg-[#FDF8F3] p-4">
        <div>
          <p className="font-semibold text-[#2D2013]">Estado Manual del Local</p>
          <p className="text-xs text-[#8B7355]">
            Apágalo en emergencias para bloquear pedidos inmediatamente.
          </p>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={config.localAbierto}
            onChange={(e) => setConfig({ ...config, localAbierto: e.target.checked })}
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300"></div>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2D2013]">Hora de Apertura</label>
          <input
            type="time"
            required
            value={timeToString(config.horaApertura)}
            onChange={(e) => setConfig({ ...config, horaApertura: stringToTime(e.target.value) })}
            className="w-full rounded-xl border border-[#D4A853]/30 bg-white px-4 py-2 text-sm outline-none focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2D2013]">Hora de Cierre</label>
          <input
            type="time"
            required
            value={timeToString(config.horaCierre)}
            onChange={(e) => setConfig({ ...config, horaCierre: stringToTime(e.target.value) })}
            className="w-full rounded-xl border border-[#D4A853]/30 bg-white px-4 py-2 text-sm outline-none focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#2D2013] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3D3023] disabled:opacity-50"
      >
        {loading ? "Guardando..." : "Guardar Cambios"}
      </button>

      <ConfirmDialog
        isOpen={alertInfo.show}
        onClose={() => setAlertInfo({show: false, msg: "", type: "warning"})}
        title={alertInfo.type === "success" ? "¡Éxito!" : "Atención"}
        message={alertInfo.msg}
        type={alertInfo.type}
        isAlert={true}
      />
    </form>
  );
}
