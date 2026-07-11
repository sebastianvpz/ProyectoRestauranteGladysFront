"use client";

import { useState } from "react";
import { registerPaymentAction } from "@/app/admin/pedidos/_components/actions";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function RegisterPaymentButton({ orderId, isPaid }: { orderId: string, isPaid: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{show: boolean, msg: string}>({show: false, msg: ""});
  const router = useRouter();

  if (isPaid) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-semibold border border-green-200">
        <CheckCircle className="h-4 w-4" />
        Pagado
      </div>
    );
  }

  const handleRegisterClick = () => {
    setShowConfirm(true);
  };

  const executeRegisterPayment = async () => {
    setShowConfirm(false);
    setIsLoading(true);
    const res = await registerPaymentAction(orderId);
    if (res.ok) {
      router.refresh();
    } else {
      setAlertInfo({show: true, msg: res.error || "Ocurrió un error al registrar el pago"});
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleRegisterClick}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
        Registrar Pago
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={executeRegisterPayment}
        title="Registrar Pago"
        message="¿Estás seguro de registrar el pago? Esto cambiará el estado a CONFIRMADO y notificará al cliente."
        type="success"
        confirmText="Sí, registrar pago"
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
