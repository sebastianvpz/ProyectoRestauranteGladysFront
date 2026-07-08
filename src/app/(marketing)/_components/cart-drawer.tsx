"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2, Send, MapPin } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils/format";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Datos del cliente
  const [customerInfo, setCustomerInfo] = useState({
    nombre: "",
    celular: "",
    direccion: "",
    latitud: "",
    longitud: "",
  });

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCustomerInfo(prev => ({
          ...prev,
          latitud: position.coords.latitude.toString(),
          longitud: position.coords.longitude.toString(),
        }));
        // Opcional: mostrar un mensajito de éxito
        alert("¡Ubicación obtenida exitosamente!");
      },
      (error) => {
        alert("No pudimos obtener tu ubicación. Por favor permite el acceso al GPS.");
        console.error(error);
      }
    );
  };

  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);


  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);

    try {
      // 1. Guardar en el Backend (Opcional, no bloqueante para WhatsApp si falla)
      const pedidoPayload = {
        cliente: {
          nombre: customerInfo.nombre,
          celular: customerInfo.celular,
          correo: "cliente@web.com" // Opcional o pedir en form
        },
        direccionEntrega: customerInfo.direccion,
        latitud: customerInfo.latitud,
        longitud: customerInfo.longitud,
        total: getTotal(),
        estado: "Pendiente",
        detalles: items.map(item => ({
          plato: { idPlato: Number(item.dish.id) },
          cantidad: item.quantity,
          precioUnitario: item.dish.price,
          subtotal: item.dish.price * item.quantity
        }))
      };

      await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoPayload),
      }).catch(err => console.warn("Error guardando en backend:", err));

      // 2. Redirigir a WhatsApp
      let message = `¡Hola Restaurante Gladys! Acabo de registrar mi pedido en la web.\n\n`;
      message += `*Mis datos:*\n`;
      message += `- Nombre: ${customerInfo.nombre}\n`;
      message += `- Celular: ${customerInfo.celular}\n`;
      message += `- Dirección: ${customerInfo.direccion}\n`;
      if (customerInfo.latitud && customerInfo.longitud) {
        message += `- 📍 Mapa: https://www.google.com/maps?q=${customerInfo.latitud},${customerInfo.longitud}\n`;
      }
      message += `\n*Mi pedido:*\n`;
      
      items.forEach((item) => {
        message += `- ${item.quantity}x ${item.dish.name} (${formatPrice(item.dish.price * item.quantity)})\n`;
      });
      
      message += `\n*Total a pagar: ${formatPrice(getTotal())}*\n\n¡Quedo a la espera de la confirmación!`;

      const phoneNumber = "51991501787";
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
      
      // Limpiar y cerrar
      clearCart();
      setIsCheckingOut(false);
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Botón Flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#C75D3A] text-white shadow-xl hover:bg-[#A94B2E] hover:scale-105 transition-all"
        aria-label="Abrir carrito"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#2D2013] text-xs font-bold text-white border-2 border-white">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay oscuro */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel lateral (Drawer) */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-[#D4A853]/20 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-[#2D2013] flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-[#C75D3A]" />
            {isCheckingOut ? "Tus Datos" : "Tu Pedido"}
          </h2>
          <button
            onClick={() => {
              setIsOpen(false);
              setTimeout(() => setIsCheckingOut(false), 300);
            }}
            className="rounded-full p-2 text-[#8B7355] hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido (Lista de productos) */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-[#8B7355] space-y-4">
              <ShoppingCart className="h-16 w-16 opacity-20" />
              <p>Tu carrito está vacío.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#C75D3A] font-medium hover:underline"
              >
                Ver el menú
              </button>
            </div>
          ) : isCheckingOut ? (
            <form id="checkout-form" onSubmit={handleWhatsAppOrder} className="space-y-5 animate-in fade-in slide-in-from-right-4">
              <div>
                <label className="block text-sm font-medium text-[#2D2013] mb-1">Nombre Completo</label>
                <input 
                  required 
                  type="text" 
                  value={customerInfo.nombre}
                  onChange={e => setCustomerInfo({...customerInfo, nombre: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#C75D3A] focus:ring-1 focus:ring-[#C75D3A] outline-none transition-all"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D2013] mb-1">Celular / WhatsApp</label>
                <input 
                  required 
                  type="tel" 
                  value={customerInfo.celular}
                  onChange={e => setCustomerInfo({...customerInfo, celular: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#C75D3A] focus:ring-1 focus:ring-[#C75D3A] outline-none transition-all"
                  placeholder="Ej. 999 888 777"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-[#2D2013]">Dirección de Entrega</label>
                  <button 
                    type="button" 
                    onClick={handleGetLocation}
                    className="text-xs font-semibold text-[#C75D3A] flex items-center gap-1 bg-[#C75D3A]/10 px-2 py-1 rounded hover:bg-[#C75D3A]/20 transition"
                  >
                    <MapPin className="h-3 w-3" />
                    Usar mi ubicación
                  </button>
                </div>
                <textarea 
                  required 
                  value={customerInfo.direccion}
                  onChange={e => setCustomerInfo({...customerInfo, direccion: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-[#C75D3A] focus:ring-1 focus:ring-[#C75D3A] outline-none transition-all resize-none h-24"
                  placeholder="Ej. Av. Los Fresnos 123, Urb. Primavera"
                />
                {customerInfo.latitud && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> ¡GPS Capturado!
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="text-sm text-[#8B7355] underline hover:text-[#2D2013]"
              >
                ← Volver al carrito
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
              {items.map((item) => (
                <div key={item.dish.id} className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#2D2013]">{item.dish.name}</h4>
                    <p className="text-[#C75D3A] font-medium">{formatPrice(item.dish.price)}</p>
                    
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-gray-200 bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-black"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-black"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.dish.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold text-[#2D2013]">
                    {formatPrice(item.dish.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer (Total y Botón WhatsApp) */}
        {items.length > 0 && (
          <div className="border-t border-[#D4A853]/20 bg-gray-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#8B7355] font-medium">Total estimado</span>
              <span className="font-display text-2xl font-bold text-[#2D2013]">
                {formatPrice(getTotal())}
              </span>
            </div>
            {isCheckingOut ? (
              <button
                form="checkout-form"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-bold text-white hover:bg-[#20bd5a] hover:scale-[1.02] transition-all shadow-lg shadow-[#25D366]/30 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  "Procesando..."
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Confirmar Pedido
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#2D2013] py-3.5 font-bold text-white hover:bg-[#C75D3A] transition-colors shadow-lg"
              >
                Continuar
              </button>
            )}
            
            {isCheckingOut && (
              <p className="text-center text-xs text-gray-400 mt-3">
                Serás redirigido a WhatsApp para enviar el detalle de tu pedido.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
