import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { ScrollReveal } from "./scroll-reveal";


export function ContactSection() {
  return (
    <section id="contacto" className="py-32 px-6 bg-[#F5EDE3]">
      <Container size="lg">
        <div className="grid md:grid-cols-2 gap-16">
          <ScrollReveal className="contact-info" id="contact-info">
            <span className="text-[#C75D3A] text-sm font-medium tracking-wider uppercase">
              Encuéntranos
            </span>
            <h2 className="font-display text-5xl font-bold text-[#2D2013] mt-4 mb-8">
              Visítanos o haz tu pedido
            </h2>

            <div className="space-y-6">
              <ContactItem
                icon={
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="Dirección"
                lines={[siteConfig.contact.address, siteConfig.contact.city]}
              />
              <ContactItem
                icon={
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Horario"
                lines={siteConfig.contact.schedule.split(" · ")}
              />
              <ContactItem
                icon={
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                title="Teléfono"
                lines={[siteConfig.contact.phone]}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal className="contact-form" id="contact-form">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="font-display text-2xl font-semibold text-[#2D2013] mb-6">
                Haz tu reservación
              </h3>
              <form className="space-y-4">
                <Field label="Nombre" placeholder="Tu nombre" />
                <Field label="Teléfono" placeholder="+51 987 654 321" type="tel" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Fecha" type="date" />
                  <div>
                    <label className="block text-[#8B7355] text-sm mb-2">Personas</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-[#D4A853]/30 focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20 outline-none transition-all bg-white">
                      <option>2 personas</option>
                      <option>4 personas</option>
                      <option>6 personas</option>
                      <option>8+ personas</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[#8B7355] text-sm mb-2">Mensaje (opcional)</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A853]/30 focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20 outline-none transition-all resize-none"
                    placeholder="Comentarios adicionales..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C75D3A] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#A84D2E] transition-colors"
                >
                  Reservar Mesa
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function ContactItem({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-[#C75D3A] rounded-full flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[#2D2013] text-lg">{title}</h3>
        {lines.map((line) => (
          <p key={line} className="text-[#8B7355]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  ...input
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[#8B7355] text-sm mb-2">{label}</label>
      <input
        {...input}
        className="w-full px-4 py-3 rounded-xl border border-[#D4A853]/30 focus:border-[#C75D3A] focus:ring-2 focus:ring-[#C75D3A]/20 outline-none transition-all"
      />
    </div>
  );
}
