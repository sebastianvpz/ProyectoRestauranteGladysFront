Estructura final
src/
├── app/
│   ├── (marketing)/              # Landing público
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Composición de secciones
│   │   └── _components/          # Privado: 9 secciones
│   ├── admin/                    # Panel (segmento real, no grupo)
│   │   ├── layout.tsx            # Sidebar + auth
│   │   ├── login/
│   │   ├── platos/{nuevo,[id]}/  # CRUD
│   │   ├── pedidos/[id]/         # Detalle + WhatsApp
│   │   ├── _lib/                 # session.ts, actions.ts
│   │   └── _components/          # logout, nav-links
│   ├── layout.tsx                # Root
│   ├── not-found.tsx
│   └── globals.css
├── modules/                      # Clean architecture por dominio
│   ├── dishes/
│   │   ├── domain/dish.ts        # Zod schemas + tipos
│   │   ├── application/          # 5 use cases (server-only)
│   │   ├── infrastructure/       # dish-repository.http.ts + .mock.ts
│   │   ├── presentation/         # dish-card, dish-grid
│   │   ├── index.ts              # Tipos p/ cliente
│   │   └── server.ts             # Use cases p/ server
│   └── orders/                   # Misma estructura + whatsapp
├── components/
│   ├── ui/                       # Button, Input, Card, Table, Badge, Label/Select
│   └── layout/                   # Container
├── lib/
│   ├── http/                     # Cliente fetch + errores tipados
│   ├── utils/                    # cn, format (precio, fecha, teléfono)
│   └── env.ts                    # Validación con Zod
└── config/site.ts
