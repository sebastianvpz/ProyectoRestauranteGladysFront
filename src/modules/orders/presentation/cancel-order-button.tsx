"use client";

import { useState } from "react";
import { updateOrderStatusAction } from "@/app/admin/pedidos/_components/actions";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { XCircle, Loader2 } from "lucide-react";

export function CancelOrderButton({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{show: boolean, msg: string}>({show: false, msg: ""});
  const router = useRouter();

  if (currentStatus !== "pending") return null;

  const handleCancelClick = () => {
    setShowConfirm(true);
  };

  const executeCancel = async () => {
    setShowConfirm(false);
    setIsLoading(true);
    const res = await updateOrderStatusAction(orderId, "cancelled");
    if (res.ok) {
      router.refresh();
    } else {
      setAlertInfo({show: true, msg: res.error || "Ocurrió un error al anular el pedido"});
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCancelClick}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
        Anular Pedido
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={executeCancel}
        title="Anular Pedido"
        message="¿Estás seguro de anular el pedido? Esta acción es irreversible."
        type="danger"
        confirmText="Sí, anular"
      />

      <ConfirmDialog
        isOpen={alertInfo.show}
        onClose={() => setAlertInfo({show: false, msg: ""})}
        title="Atención"
        message={alertInfo.msg}
        type="warning"
        isAlert={true}
      />
    </>
  );
}
