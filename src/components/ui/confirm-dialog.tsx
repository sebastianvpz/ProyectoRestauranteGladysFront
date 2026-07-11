"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: "warning" | "danger" | "success" | "info";
  confirmText?: string;
  cancelText?: string;
  isAlert?: boolean; // Si es true, solo muestra botón "Aceptar"
};

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isAlert = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const icons = {
    warning: <AlertTriangle className="h-6 w-6 text-amber-500" />,
    danger: <XCircle className="h-6 w-6 text-red-500" />,
    success: <CheckCircle className="h-6 w-6 text-emerald-500" />,
    info: <Info className="h-6 w-6 text-blue-500" />,
  };

  const bgColors = {
    warning: "bg-amber-100",
    danger: "bg-red-100",
    success: "bg-emerald-100",
    info: "bg-blue-100",
  };

  const btnColors = {
    warning: "bg-amber-600 hover:bg-amber-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    info: "bg-blue-600 hover:bg-blue-700 text-white",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`shrink-0 p-3 rounded-full ${bgColors[type]}`}>
              {icons[type]}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          {!isAlert && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              if (isAlert) onClose();
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${btnColors[type]}`}
          >
            {isAlert ? "Aceptar" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
