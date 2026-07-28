# +Hogares — Consola Operativa Hipotecaria

Prototipo funcional de la consola de evaluación crediticia hipotecaria del **Banco de la Nación Argentina**. Permite a analistas humanos revisar solicitudes de crédito, consultar datos consolidados del solicitante y tomar decisiones asistidas por IA.

🔗 **Demo en vivo:** https://marifilizzola8-del.github.io/hogares-app/

---

## ¿Qué es?

+Hogares es una herramienta interna para agentes del BNA que centraliza la gestión de solicitudes de crédito hipotecario. El analista puede ver el estado de la cola operativa, revisar el perfil crediticio de cada solicitante (RENAPER, BCRA, AFIP, propiedad) y ejecutar un análisis de IA que sugiere una decisión antes de la aprobación o rechazo formal.

---

## Páginas

| Página | Descripción |
|---|---|
| `index.html` | Dashboard con KPIs, distribuciones, Top 5 prioritarios e histórico mensual |
| `solicitudes.html` | Cola operativa con paginación (450 solicitudes, 10 por página), búsqueda y filtros |
| `detalle.html` | Perfil completo del solicitante: RENAPER, BCRA, AFIP, propiedad, recibos y notas |
| `analisis.html` | Resultado del análisis IA con semáforo, razones, condiciones y panel de decisión |

---

## Stack

- **Frontend estático puro** — HTML + CSS + JavaScript vanilla
- Sin frameworks, sin build step, sin backend
- Se abre directamente en el browser

---

## Datos mock

Los datos son generados determinísticamente desde `mock-data.js`:

- **10 solicitudes seed** con datos reales derivados de `mock_data.py`
- **440 solicitudes adicionales** generadas programáticamente para simular la cola real (450 en total)
- Reglas de negocio aplicadas:
  - `cuota = precio × 0.0030`
  - `ratio = cuota / neto`
  - `ai_decision`: score ≥ 900 → APROBAR · score < 620 → RECHAZAR · resto → REVISAR
  - `sla_vencido`: true si la solicitud lleva más de 60 días en cola

---

## Flujo de navegación

```
Dashboard → Solicitudes → Detalle → Análisis IA → Decisión
```

La decisión (Aprobar / Rechazar / En espera) solo está disponible luego de ejecutar el análisis IA. El analista debe completar ese paso antes de poder registrar su resolución.

---

## Estructura de archivos

```
hogares-app/
├── index.html        Dashboard principal
├── solicitudes.html  Cola operativa con paginación
├── detalle.html      Detalle del solicitante
├── analisis.html     Análisis IA + decisión
├── shared.css        Estilos compartidos + design tokens + responsive
├── mock-data.js      450 solicitudes mock + helpers
└── README.md         Este archivo
```

---

## Pendiente / fuera de scope

- Backend / API real
- Autenticación y login
- Persistencia de notas internas
- Filtros funcionales en la cola
- Exportar CSV / JSON

---

*IBM Client Engineering · Prototipo UX © 2026*
