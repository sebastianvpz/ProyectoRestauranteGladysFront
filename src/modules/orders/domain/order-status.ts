import { orderStatusSchema, type OrderStatus } from "./order";

export const ORDER_STATUSES: OrderStatus[] = orderStatusSchema.options;

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  preparing: "En preparación",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export const ORDER_STATUS_TONE: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  preparing: "bg-violet-100 text-violet-800 border-violet-200",
  ready: "bg-emerald-100 text-emerald-800 border-emerald-200",
  delivered: "bg-slate-100 text-slate-700 border-slate-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};
