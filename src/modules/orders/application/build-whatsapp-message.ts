import type { Order } from "../domain";
import { formatPrice } from "@/lib/utils/format";

export function buildWhatsappMessage(order: Order, restaurantName = "Restaurante Gladys"): string {
  const lines: string[] = [];
  lines.push(`Hola ${order.customerName}, te escribimos de ${restaurantName}.`);
  lines.push("");
  lines.push(`*Pedido:* ${order.code}`);
  lines.push(`*Estado:* ${order.status}`);
  lines.push("");
  lines.push("*Detalle:*");
  for (const item of order.items) {
    const subtotal = item.unitPrice * item.quantity;
    lines.push(`• ${item.quantity} x ${item.name} — ${formatPrice(subtotal)}`);
    if (item.notes) lines.push(`  _${item.notes}_`);
  }
  lines.push("");
  lines.push(`*Total:* ${formatPrice(order.total)}`);

  if (order.customerAddress) {
    lines.push("");
    lines.push(`*Entrega:* ${order.customerAddress}`);
  }

  if (order.notes) {
    lines.push("");
    lines.push(`*Notas:* ${order.notes}`);
  }

  return lines.join("\n");
}

export function buildWhatsappUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}
